import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import type { LearningProgress, AchievementBadge } from "./useChildProfiles";

export function useLearningModules() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startModule = useCallback(async (childId: string, moduleId: string, totalLessons: number = 10) => {
    if (!user) throw new Error('Bruger ikke logget ind');

    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase.functions.invoke('learning-modules', {
        body: {
          action: 'start_module',
          childId,
          moduleId,
          data: { totalLessons }
        }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error starting module:', error);
      setError('Kunne ikke starte modul');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const completeLesson = useCallback(async (childId: string, moduleId: string, lessonId: string) => {
    if (!user) throw new Error('Bruger ikke logget ind');

    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase.functions.invoke('learning-modules', {
        body: {
          action: 'complete_lesson',
          childId,
          moduleId,
          lessonId
        }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error completing lesson:', error);
      setError('Kunne ikke markere lektion som færdig');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const getChildProgress = useCallback(async (childId: string): Promise<{ progress: LearningProgress[] }> => {
    if (!user) throw new Error('Bruger ikke logget ind');

    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase.functions.invoke('learning-modules', {
        body: {
          action: 'get_progress',
          childId
        }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error getting child progress:', error);
      setError('Kunne ikke hente progression');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const getChildBadges = useCallback(async (childId: string): Promise<{ badges: AchievementBadge[] }> => {
    if (!user) throw new Error('Bruger ikke logget ind');

    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase.functions.invoke('learning-modules', {
        body: {
          action: 'get_badges',
          childId
        }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error getting child badges:', error);
      setError('Kunne ikke hente badges');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [user]);

  return {
    loading,
    error,
    startModule,
    completeLesson,
    getChildProgress,
    getChildBadges
  };
}