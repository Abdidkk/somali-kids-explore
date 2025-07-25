import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ChildAnalytics {
  childId: string
  childName: string
  totalLearningTime: number
  completedModules: number
  badgesEarned: number
  progressByCategory: {
    [category: string]: number
  }
  recentActivity: any[]
  recommendedNextSteps: string[]
  overallProgress: number
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
    const { action, parentId, childId } = await req.json()
    
    console.log(`Parent dashboard action: ${action} for parent: ${parentId}`)

    let result;
    switch(action) {
      case 'get_family_overview':
        result = await getFamilyOverview(supabase, parentId)
        break
      
      case 'get_child_analytics':
        result = await getChildAnalytics(supabase, parentId, childId)
        break
      
      case 'get_learning_recommendations':
        result = await getLearningRecommendations(supabase, parentId, childId)
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
      p_event_type: `parent_dashboard_${action}`,
      p_user_id: parentId,
      p_metadata: JSON.stringify({
        action,
        parentId,
        childId,
        success: true
      }),
      p_severity: 'INFO'
    })

    return new Response(JSON.stringify(result), { 
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Parent dashboard error:', error)
    
    await supabase.rpc('log_event', {
      p_event_type: 'parent_dashboard_error',
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

async function getFamilyOverview(supabase: any, parentId: string) {
  // Verify parent access
  const { data: children, error: childrenError } = await supabase
    .from('child_profiles')
    .select('*')
    .eq('parent_user_id', parentId)

  if (childrenError) throw childrenError

  const familyAnalytics = []
  
  for (const child of children) {
    const analytics = await generateChildAnalytics(supabase, child.id, child.name)
    familyAnalytics.push(analytics)
  }

  // Calculate family totals
  const familyTotals = {
    totalChildren: children.length,
    totalLearningTime: familyAnalytics.reduce((sum, child) => sum + child.totalLearningTime, 0),
    totalBadges: familyAnalytics.reduce((sum, child) => sum + child.badgesEarned, 0),
    totalCompletedModules: familyAnalytics.reduce((sum, child) => sum + child.completedModules, 0),
    averageProgress: familyAnalytics.length > 0 
      ? familyAnalytics.reduce((sum, child) => sum + child.overallProgress, 0) / familyAnalytics.length 
      : 0
  }

  return {
    familyTotals,
    childrenAnalytics: familyAnalytics
  }
}

async function getChildAnalytics(supabase: any, parentId: string, childId: string) {
  // Verify parent access to child
  const { data: childData, error: childError } = await supabase
    .from('child_profiles')
    .select('name, parent_user_id')
    .eq('id', childId)
    .single()

  if (childError || childData.parent_user_id !== parentId) {
    throw new Error('Ingen adgang til barnets data')
  }

  const analytics = await generateChildAnalytics(supabase, childId, childData.name)
  return analytics
}

async function generateChildAnalytics(
  supabase: any, 
  childId: string,
  childName: string
): Promise<ChildAnalytics> {
  // Get learning progress
  const { data: progressData } = await supabase
    .from('learning_progress')
    .select('*')
    .eq('child_id', childId)

  // Calculate learning time (15 min per completed lesson)
  const totalLearningTime = progressData.reduce(
    (sum, progress) => sum + (progress.completed_lessons * 15), 
    0
  )

  // Count completed modules
  const completedModules = progressData.filter(
    progress => progress.progress_percentage === 100
  ).length

  // Get badges
  const { data: badgesData } = await supabase
    .from('achievement_badges')
    .select('*')
    .eq('child_id', childId)

  const badgesEarned = badgesData.length

  // Calculate progress by category
  const progressByCategory = {}
  progressData.forEach(progress => {
    const category = getCategoryFromModuleId(progress.module_id)
    if (!progressByCategory[category]) {
      progressByCategory[category] = []
    }
    progressByCategory[category].push(progress.progress_percentage)
  })

  // Average progress per category
  Object.keys(progressByCategory).forEach(category => {
    const progresses = progressByCategory[category]
    progressByCategory[category] = progresses.reduce((sum, p) => sum + p, 0) / progresses.length
  })

  // Get recent activity (last 5 badge achievements and progress updates)
  const recentActivity = [
    ...badgesData.slice(0, 3).map(badge => ({
      type: 'badge',
      title: `Fik badge: ${badge.badge_name}`,
      date: badge.earned_date,
      category: badge.category
    })),
    ...progressData
      .filter(p => p.last_completed_lesson_date)
      .sort((a, b) => new Date(b.last_completed_lesson_date) - new Date(a.last_completed_lesson_date))
      .slice(0, 3)
      .map(progress => ({
        type: 'lesson',
        title: `Gennemførte lektion i ${progress.module_id}`,
        date: progress.last_completed_lesson_date,
        category: getCategoryFromModuleId(progress.module_id)
      }))
  ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5)

  // Calculate overall progress
  const overallProgress = progressData.length > 0 
    ? progressData.reduce((sum, p) => sum + p.progress_percentage, 0) / progressData.length 
    : 0

  // Generate recommendations
  const recommendedNextSteps = determineNextSteps(
    progressByCategory, 
    completedModules,
    overallProgress
  )

  return {
    childId,
    childName,
    totalLearningTime,
    completedModules,
    badgesEarned,
    progressByCategory,
    recentActivity,
    recommendedNextSteps,
    overallProgress
  }
}

async function getLearningRecommendations(supabase: any, parentId: string, childId: string) {
  const analytics = await getChildAnalytics(supabase, parentId, childId)
  
  // Get child's profile for personalized recommendations
  const { data: childProfile } = await supabase
    .from('child_profiles')
    .select('learning_level, interests, preferred_learning_style')
    .eq('id', childId)
    .single()

  const recommendations = {
    nextModules: generateModuleRecommendations(analytics.progressByCategory, childProfile),
    learningTips: generateLearningTips(childProfile.preferred_learning_style),
    weeklyGoals: generateWeeklyGoals(analytics.overallProgress),
    parentActions: generateParentActions(analytics)
  }

  return recommendations
}

function getCategoryFromModuleId(moduleId: string): string {
  const id = moduleId.toLowerCase()
  
  if (id.includes('alfabet') || id.includes('bogstav')) return 'Alfabet'
  if (id.includes('farve') || id.includes('color')) return 'Farver'
  if (id.includes('tal') || id.includes('nummer') || id.includes('matematik')) return 'Tal'
  if (id.includes('mad') || id.includes('food')) return 'Mad'
  if (id.includes('dyr') || id.includes('animal')) return 'Dyr'
  if (id.includes('krop') || id.includes('body')) return 'Kropsdel'
  if (id.includes('geografi') || id.includes('geography')) return 'Geografi'
  if (id.includes('kalender') || id.includes('calendar') || id.includes('dato')) return 'Kalender'
  if (id.includes('familie') || id.includes('family') || id.includes('ven')) return 'Familie og venner'
  if (id.includes('ord') || id.includes('word') || id.includes('vocabular')) return 'Ord'
  if (id.includes('daglig') || id.includes('aktivitet') || id.includes('daily')) return 'Daglige aktiviteter'
  if (id.includes('sætning') || id.includes('sentence')) return 'Sætninger'
  if (id.includes('kultur') || id.includes('culture')) return 'Kulturelt indhold'
  if (id.includes('læs') || id.includes('bog') || id.includes('read') || id.includes('book')) return 'Læse bøger'
  if (id.includes('quiz') || id.includes('test')) return 'Quiz'
  
  return 'Alfabet' // Default fallback
}

function determineNextSteps(
  progressByCategory: { [category: string]: number }, 
  completedModules: number,
  overallProgress: number
): string[] {
  const steps: string[] = []

  // Find category with lowest progress
  const categories = Object.entries(progressByCategory)
  if (categories.length > 0) {
    const lowestCategory = categories.reduce((lowest, [category, progress]) => 
      progress < lowest.progress ? { category, progress } : lowest, 
      { category: '', progress: Infinity }
    )

    if (lowestCategory.category) {
      steps.push(`Fokuser på ${lowestCategory.category} læring`)
    }
  }

  if (completedModules < 3) {
    steps.push('Prøv flere forskellige læringsmoduler')
  }

  if (overallProgress < 50) {
    steps.push('Øg daglig læringstid til 20-30 minutter')
  }

  steps.push('Gennemfør ugentlige læringsmål')
  steps.push('Udforsk nye interesseområder')

  return steps
}

function generateModuleRecommendations(progressByCategory: any, childProfile: any): string[] {
  const recommendations = []
  
  if (!progressByCategory['Alfabet'] || progressByCategory['Alfabet'] < 50) {
    recommendations.push('Alfabet Sporing - Grundlæggende bogstavlæring')
  }
  
  if (!progressByCategory['Tal'] || progressByCategory['Tal'] < 50) {
    recommendations.push('Tal og Tælling - Matematiske grundbegreber')
  }
  
  if (!progressByCategory['Farver'] || progressByCategory['Farver'] < 50) {
    recommendations.push('Farver - Lær forskellige farver')
  }
  
  if (!progressByCategory['Mad'] || progressByCategory['Mad'] < 50) {
    recommendations.push('Mad - Frugter og grøntsager')
  }
  
  if (!progressByCategory['Dyr'] || progressByCategory['Dyr'] < 50) {
    recommendations.push('Dyr - Somaliske dyrenavne')
  }
  
  if (!progressByCategory['Kropsdel'] || progressByCategory['Kropsdel'] < 50) {
    recommendations.push('Kropsdel - Lær kroppens dele på somalisk')
  }
  
  if (!progressByCategory['Geografi'] || progressByCategory['Geografi'] < 50) {
    recommendations.push('Geografi - Lande og regioner')
  }
  
  if (!progressByCategory['Kalender'] || progressByCategory['Kalender'] < 50) {
    recommendations.push('Kalender - Dage, måneder og årstider')
  }
  
  if (!progressByCategory['Familie og venner'] || progressByCategory['Familie og venner'] < 50) {
    recommendations.push('Familie og venner - Relationer og sociale dynamikker')
  }
  
  if (!progressByCategory['Ord'] || progressByCategory['Ord'] < 50) {
    recommendations.push('Ord - Udvid ordforrådet')
  }
  
  if (!progressByCategory['Daglige aktiviteter'] || progressByCategory['Daglige aktiviteter'] < 50) {
    recommendations.push('Daglige aktiviteter - Almindelige hverdagsopgaver')
  }
  
  if (!progressByCategory['Sætninger'] || progressByCategory['Sætninger'] < 50) {
    recommendations.push('Sætninger - Kommunikationsøvelser')
  }
  
  if (!progressByCategory['Læse bøger'] || progressByCategory['Læse bøger'] < 50) {
    recommendations.push('Læse bøger - Historier og læseforståelse')
  }
  
  if (!progressByCategory['Quiz'] || progressByCategory['Quiz'] < 50) {
    recommendations.push('Quiz - Test din viden')
  }
  
  recommendations.push('Kulturelt indhold - Somalisk kulturarv')
  
  return recommendations
}

function generateLearningTips(learningStyle: string): string[] {
  const tips = {
    'visuel': [
      'Brug farverige illustrationer og diagrammer',
      'Lav visuelle læringsmaps sammen',
      'Se lærevideoer med animationer'
    ],
    'auditiv': [
      'Læs højt sammen hver dag',
      'Brug sang og rim til at huske',
      'Diskuter det lærte sammen'
    ],
    'kinæstetisk': [
      'Lav praktiske øvelser og eksperimenter',
      'Brug bevægelse i læringen',
      'Byg og skab ting sammen'
    ],
    'læse/skrive': [
      'Skriv noter og sammendrag sammen',
      'Lav læringsjournaler',
      'Løs skriftlige opgaver regelmæssigt'
    ]
  }
  
  return tips[learningStyle] || tips['visuel']
}

function generateWeeklyGoals(overallProgress: number): string[] {
  const goals = []
  
  if (overallProgress < 25) {
    goals.push('Gennemfør 3 lektioner denne uge')
    goals.push('Øv alfabet i 10 minutter dagligt')
  } else if (overallProgress < 75) {
    goals.push('Afslut et helt modul')
    goals.push('Få 2 nye badges')
  } else {
    goals.push('Udforsk avancerede emner')
    goals.push('Hjælp andre børn med læring')
  }
  
  return goals
}

function generateParentActions(analytics: ChildAnalytics): string[] {
  const actions = []
  
  if (analytics.totalLearningTime < 100) {
    actions.push('Sæt fast tid til daglig læring')
  }
  
  if (analytics.badgesEarned === 0) {
    actions.push('Fejr små fremskridt med dit barn')
  }
  
  actions.push('Gennemgå ugens fremskridt sammen')
  actions.push('Stil spørgsmål om det lærte')
  
  return actions
}