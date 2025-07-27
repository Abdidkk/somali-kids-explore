import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface LearningModule {
  id: string
  name: string
  category: string
  difficulty: 'let' | 'mellem' | 'svær'
  lessons: Lesson[]
}

interface Lesson {
  id: string
  title: string
  content: string
  type: 'video' | 'quiz' | 'interaktiv'
  duration: number
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  try {
    const { action, childId, moduleId, lessonId, data } = await req.json()
    
    console.log(`Learning module action: ${action} for child: ${childId}`)

    let result;
    switch(action) {
      case 'start_module':
        result = await startLearningModule(supabase, childId, moduleId, data?.totalLessons || 10)
        break
      
      case 'complete_lesson':
        result = await completeLesson(supabase, childId, moduleId, lessonId)
        break
      
      case 'get_progress':
        result = await getChildProgress(supabase, childId)
        break
      
      case 'get_badges':
        result = await getChildBadges(supabase, childId)
        break
      
      default:
        return new Response(JSON.stringify({ 
          error: 'Ugyldig handling' 
        }), { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
    }

    await supabase.rpc('log_event', {
      p_event_type: `learning_module_${action}`,
      p_user_id: null,
      p_metadata: JSON.stringify({
        action,
        childId,
        moduleId,
        success: true
      }),
      p_severity: 'INFO'
    })

    return new Response(JSON.stringify(result), { 
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Learning module error:', error)
    
    await supabase.rpc('log_event', {
      p_event_type: 'learning_module_error',
      p_user_id: null,
      p_metadata: JSON.stringify({
        error: error.message
      }),
      p_severity: 'ERROR'
    })

    return new Response(JSON.stringify({ 
      error: 'Intern serverfejl' 
    }), { 
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})

async function startLearningModule(
  supabase: any, 
  childId: string, 
  moduleId: string,
  totalLessons: number = 10
) {
  const { data, error } = await supabase
    .from('learning_progress')
    .upsert({
      child_id: childId,
      module_id: moduleId,
      completed_lessons: 0,
      total_lessons: totalLessons,
      progress_percentage: 0,
      mastery_level: 'påbegyndt',
      difficulty_level: 'let'
    }, {
      onConflict: 'child_id,module_id'
    })
    .select()

  if (error) throw error

  return { success: true, progress: data }
}

async function completeLesson(
  supabase: any, 
  childId: string, 
  moduleId: string, 
  lessonId: string
) {
  // Get child profile to get the name
  const { data: childProfile, error: childError } = await supabase
    .from('child_profiles')
    .select('name, parent_user_id')
    .eq('id', childId)
    .single()

  if (childError) throw childError

  const { data: progressData, error: progressError } = await supabase
    .from('learning_progress')
    .select('*')
    .eq('child_id', childId)
    .eq('module_id', moduleId)
    .single()

  if (progressError) throw progressError

  const newCompletedLessons = Math.min(
    progressData.completed_lessons + 1,
    progressData.total_lessons
  )

  const progressPercentage = Math.round(
    (newCompletedLessons / progressData.total_lessons) * 100
  )

  const masteryLevel = progressPercentage === 100 ? 'fuld' : 
                      progressPercentage >= 70 ? 'delvist' : 'påbegyndt'

  const { data, error } = await supabase
    .from('learning_progress')
    .update({
      completed_lessons: newCompletedLessons,
      progress_percentage: progressPercentage,
      last_completed_lesson_date: new Date().toISOString(),
      mastery_level: masteryLevel
    })
    .eq('child_id', childId)
    .eq('module_id', moduleId)
    .select()

  if (error) throw error

  // Update the progress table with points (compatible with existing PointsManager system)
  const category = getCategoryFromModule(moduleId)
  const pointsEarned = 10 // Points per lesson completed
  
  await supabase
    .from('progress')
    .upsert({
      user_id: childProfile.parent_user_id,
      child_name: childProfile.name,
      category: category,
      total_points: pointsEarned,
      activities_completed: 1,
      time_spent: 5, // Assume 5 minutes per lesson
      category_enabled: true
    }, {
      onConflict: 'user_id,child_name,category',
      ignoreDuplicates: false
    })

  // Also add a quiz result entry for tracking
  await supabase
    .from('quiz_results')
    .insert({
      user_id: childProfile.parent_user_id,
      child_name: childProfile.name,
      category: category,
      activity_name: `${moduleId} - ${lessonId}`,
      score: pointsEarned,
      max_score: pointsEarned,
      completion_time: 300, // 5 minutes in seconds
      answers: { lesson_completed: true, module_id: moduleId, lesson_id: lessonId }
    })

  // Award badges for milestones
  const badges = []
  
  if (progressPercentage === 100) {
    const { data: badgeData } = await supabase
      .from('achievement_badges')
      .insert({
        child_id: childId,
        badge_name: `Modul Mester: ${moduleId}`,
        badge_description: `Fuldendte ${moduleId} modul med 100% progression`,
        category: getCategoryFromModule(moduleId)
      })
      .select()
    
    if (badgeData) badges.push(...badgeData)
  }

  if (newCompletedLessons === 1) {
    const { data: badgeData } = await supabase
      .from('achievement_badges')
      .insert({
        child_id: childId,
        badge_name: 'Første Lektion',
        badge_description: 'Gennemførte din første lektion!',
        category: getCategoryFromModule(moduleId)
      })
      .select()
    
    if (badgeData) badges.push(...badgeData)
  }

  return { 
    success: true, 
    progress: data[0],
    newBadges: badges
  }
}

async function getChildProgress(supabase: any, childId: string) {
  const { data, error } = await supabase
    .from('learning_progress')
    .select('*')
    .eq('child_id', childId)
    .order('updated_at', { ascending: false })

  if (error) throw error

  return { progress: data }
}

async function getChildBadges(supabase: any, childId: string) {
  const { data, error } = await supabase
    .from('achievement_badges')
    .select('*')
    .eq('child_id', childId)
    .order('earned_date', { ascending: false })

  if (error) throw error

  return { badges: data }
}

function getCategoryFromModule(moduleId: string): string {
  const id = moduleId.toLowerCase();
  
  console.log(`Categorizing module: ${moduleId}`);
  
  // Map moduleId to actual learning categories
  if (id.includes('alfabet') || id.includes('bogstav')) return 'Alfabet';
  if (id.includes('farve') || id.includes('color')) return 'Farver';
  if (id.includes('tal') || id.includes('nummer') || id.includes('matematik')) return 'Tal';
  if (id.includes('mad') || id.includes('food')) return 'Mad';
  if (id.includes('dyr') || id.includes('animal')) return 'Dyr';
  if (id.includes('krop') || id.includes('body')) return 'Kropsdel';
  if (id.includes('geografi') || id.includes('geography')) return 'Geografi';
  if (id.includes('kalender') || id.includes('calendar') || id.includes('dato')) return 'Kalender';
  if (id.includes('familie') || id.includes('family') || id.includes('ven')) return 'Familie og venner';
  if (id.includes('ord') || id.includes('word') || id.includes('vocabular')) return 'Ord';
  if (id.includes('daglig') || id.includes('aktivitet') || id.includes('daily')) return 'Daglige aktiviteter';
  if (id.includes('sætning') || id.includes('sentence')) return 'Sætninger';
  if (id.includes('kultur') || id.includes('culture')) return 'Kulturelt indhold';
  if (id.includes('læs') || id.includes('bog') || id.includes('read') || id.includes('book')) return 'Læse bøger';
  if (id.includes('quiz') || id.includes('test')) return 'Quiz';
  
  console.log(`No specific category found for ${moduleId}, defaulting to Alfabet`);
  return 'Alfabet'; // Default to main learning category
}