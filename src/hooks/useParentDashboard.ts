import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface ChildAnalytics {
  childId: string;
  childName: string;
  totalLearningTime: number;
  completedModules: number;
  badgesEarned: number;
  progressByCategory: {
    [category: string]: number;
  };
  recentActivity: Array<{
    type: 'badge' | 'lesson';
    title: string;
    date: string;
    category: string;
  }>;
  recommendedNextSteps: string[];
  overallProgress: number;
}

export interface FamilyOverview {
  familyTotals: {
    totalChildren: number;
    totalLearningTime: number;
    totalBadges: number;
    totalCompletedModules: number;
    averageProgress: number;
  };
  childrenAnalytics: ChildAnalytics[];
}

export interface LearningRecommendations {
  nextModules: string[];
  learningTips: string[];
  weeklyGoals: string[];
  parentActions: string[];
}

export function useParentDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getFamilyOverview = useCallback(async (): Promise<FamilyOverview> => {
    if (!user) throw new Error('Bruger ikke logget ind');

    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase.functions.invoke('parent-dashboard', {
        body: {
          action: 'get_family_overview',
          parentId: user.id
        }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error getting family overview:', error);
      setError('Kunne ikke hente familieoversigt');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const getChildAnalytics = useCallback(async (childId: string): Promise<ChildAnalytics> => {
    if (!user) throw new Error('Bruger ikke logget ind');

    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase.functions.invoke('parent-dashboard', {
        body: {
          action: 'get_child_analytics',
          parentId: user.id,
          childId
        }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error getting child analytics:', error);
      setError('Kunne ikke hente analyser for barn');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const getLearningRecommendations = useCallback(async (childId: string): Promise<LearningRecommendations> => {
    if (!user) throw new Error('Bruger ikke logget ind');

    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase.functions.invoke('parent-dashboard', {
        body: {
          action: 'get_learning_recommendations',
          parentId: user.id,
          childId
        }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error getting learning recommendations:', error);
      setError('Kunne ikke hente læringsanbefalinger');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [user]);

  return {
    loading,
    error,
    getFamilyOverview,
    getChildAnalytics,
    getLearningRecommendations
  };
}