import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PointsManager } from "@/utils/pointsManager";
import { useAuth } from "@/hooks/useAuth";
import { useChildren } from "@/hooks/useChildren";
import { resolveChildProfileIdByName } from "@/utils/childProfile";

// Helper: Lav lokal dato-nøgle (YYYY-MM-DD)
function localDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}


// Beregn streak baseret på sammenhængende aktivitetsdage
export async function calculateStreak(
  userId: string, 
  childId: string | null, 
  childName: string
): Promise<number> {
  let query = supabase
    .from('quiz_results')
    .select('created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (childId) {
    query = query.eq('child_profile_id', childId);
  } else {
    query = query.eq('child_name', childName);
  }

  const { data: activities } = await query;
  
  if (!activities || activities.length === 0) return 0;

  // Konverter til unikke datoer (kun dato-delen)
  const uniqueDates = [...new Set(
    activities.map(a => localDateKey(new Date(a.created_at)))
  )].sort().reverse();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const todayStr = localDateKey(today);
  const yesterdayStr = localDateKey(yesterday);
  
  
  const hasActivityToday = uniqueDates.includes(todayStr);
  const hasActivityYesterday = uniqueDates.includes(yesterdayStr);

  // Hvis ingen aktivitet i dag eller i går, streak = 0
  if (!hasActivityToday && !hasActivityYesterday) {
    return 0;
  }

  // Start fra i dag eller i går
  let checkDate = hasActivityToday ? new Date(today) : new Date(yesterday);
  let streak = 0;

  // Tæl sammenhængende dage
  for (const dateStr of uniqueDates) {
    const checkDateStr = localDateKey(checkDate);

    
    if (dateStr === checkDateStr) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else if (dateStr < checkDateStr) {
      break; // Hul i aktivitet - streak stopper
    }
  }

  return streak;
}


export interface ChildProgressData {
  name: string;
  totalPoints: number;
  activitiesCompleted: number;
  streak: number;
  lastActivity: string | null;
  categoryProgress: Record<string, number>;
  recentActivity: any[];
}

export function useMultiChildProgress() {
  const { user } = useAuth();
  const { children } = useChildren();
  const [childrenData, setChildrenData] = useState<ChildProgressData[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAllChildrenProgress = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Get registered children from database
      let childrenToProcess = children.map(child => child.name);
      
      // If no registered children, check for existing progress data
      if (childrenToProcess.length === 0) {
        const { data: childrenList } = await supabase
          .from('progress')
          .select('child_name')
          .eq('user_id', user.id);

        const uniqueChildren = [...new Set(childrenList?.map(c => c.child_name) || [])];
        if (uniqueChildren.length === 0) {
          uniqueChildren.push('default');
        }
        childrenToProcess = uniqueChildren;
      }

      const allChildrenData: ChildProgressData[] = [];

      for (const childName of childrenToProcess) {
        // Resolve id for this child (latest profile)
        const childId = await resolveChildProfileIdByName(user.id, childName);

        // Set current child and get progress
        if (childId) {
          PointsManager.setCurrentChildWithId(childName, childId);
        } else {
          PointsManager.setCurrentChild(childName);
        }
        const progress = await PointsManager.getProgress();

        // Get recent activity (prefer id)
        let recentQuery = supabase
          .from('quiz_results')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5);

        if (childId) {
          recentQuery = recentQuery.eq('child_profile_id', childId);
        } else {
          recentQuery = recentQuery.eq('child_name', childName);
        }

        const { data: recentActivity } = await recentQuery;

        // Calculate streak 
        const streak = await calculateStreak(user.id, childId, childName);

        // Get last activity date
        const lastActivity = recentActivity && recentActivity.length > 0 
          ? new Date(recentActivity[0].created_at as string).toLocaleDateString('da-DK')
          : null;

        allChildrenData.push({
          name: childName,
          totalPoints: progress.totalPoints,
          activitiesCompleted: progress.activitiesCompleted,
          streak,
          lastActivity,
          categoryProgress: progress.categoryScores,
          recentActivity: recentActivity || []
        });
      }

      setChildrenData(allChildrenData);
    } catch (error) {
      console.error('Error loading children progress:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadAllChildrenProgress();
    }
  }, [user, children]);

  return {
    childrenData,
    loading,
    refreshData: loadAllChildrenProgress
  };
}
