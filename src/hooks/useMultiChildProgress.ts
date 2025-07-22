
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PointsManager } from "@/utils/pointsManager";
import { useAuth } from "@/hooks/useAuth";
import { useChildren } from "@/hooks/useChildren";

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
        // Set current child and get progress
        PointsManager.setCurrentChild(childName);
        const progress = await PointsManager.getProgress();

        // Get recent activity
        const { data: recentActivity } = await supabase
          .from('quiz_results')
          .select('*')
          .eq('user_id', user.id)
          .eq('child_name', childName)
          .order('created_at', { ascending: false })
          .limit(5);

        // Calculate streak (simplified - can be enhanced)
        const streak = Math.floor(Math.random() * 10); // Placeholder - implement proper streak calculation

        // Get last activity date
        const lastActivity = recentActivity && recentActivity.length > 0 
          ? new Date(recentActivity[0].created_at).toLocaleDateString('da-DK')
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
