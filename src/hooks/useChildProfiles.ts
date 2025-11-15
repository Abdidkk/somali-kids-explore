import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface ChildProfile {
  id: string;
  parent_user_id: string;
  name: string;
  age?: number;
  learning_level: 'begynder' | 'øvet' | 'avanceret';
  interests: string[];
  avatar_color: string;
  avatar_url?: string;
  special_needs?: string;
  preferred_learning_style: 'visuel' | 'auditiv' | 'kinæstetisk' | 'læse/skrive';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface LearningProgress {
  id: string;
  child_id: string;
  module_id: string;
  completed_lessons: number;
  total_lessons: number;
  progress_percentage: number;
  last_completed_lesson_date?: string;
  mastery_level: 'påbegyndt' | 'delvist' | 'fuld';
  difficulty_level: 'let' | 'middel' | 'svær';
  created_at: string;
  updated_at: string;
}

export interface AchievementBadge {
  id: string;
  child_id: string;
  badge_name: string;
  badge_description?: string;
  earned_date: string;
  category: 'læsning' | 'matematik' | 'sprog' | 'videnskab' | 'kreativitet' | 'alfabet';
}

export function useChildProfiles() {
  const { user } = useAuth();
  const [childProfiles, setChildProfiles] = useState<ChildProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadChildProfiles = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('child_profiles')
        .select('*')
        .eq('parent_user_id', user.id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setChildProfiles((data || []) as ChildProfile[]);
    } catch (error) {
      console.error('Error loading child profiles:', error);
      setError('Kunne ikke indlæse børneprofiler');
    } finally {
      setLoading(false);
    }
  };

  const addChildProfile = async (
    name: string, 
    age?: number, 
    avatarColor = 'purple',
    learningLevel: 'begynder' | 'øvet' | 'avanceret' = 'begynder',
    interests: string[] = [],
    preferredLearningStyle: 'visuel' | 'auditiv' | 'kinæstetisk' | 'læse/skrive' = 'visuel'
  ) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('child_profiles')
        .insert({
          parent_user_id: user.id,
          name,
          age,
          avatar_color: avatarColor,
          learning_level: learningLevel,
          interests,
          preferred_learning_style: preferredLearningStyle
        })
        .select()
        .single();

      if (error) throw error;
      setChildProfiles(prev => [...prev, data as ChildProfile]);
      return data as ChildProfile;
    } catch (error) {
      console.error('Error adding child profile:', error);
      throw error;
    }
  };

  const updateChildProfile = async (
    childId: string, 
    updates: Partial<Omit<ChildProfile, 'id' | 'parent_user_id' | 'created_at' | 'updated_at'>>
  ) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('child_profiles')
        .update(updates)
        .eq('id', childId)
        .eq('parent_user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      setChildProfiles(prev => prev.map(child => child.id === childId ? data as ChildProfile : child));
      return data as ChildProfile;
    } catch (error) {
      console.error('Error updating child profile:', error);
      throw error;
    }
  };

  const deleteChildProfile = async (childId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('child_profiles')
        .delete()
        .eq('id', childId)
        .eq('parent_user_id', user.id);

      if (error) throw error;
      setChildProfiles(prev => prev.filter(child => child.id !== childId));
    } catch (error) {
      console.error('Error deleting child profile:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (user) {
      loadChildProfiles();
    }
  }, [user]);

  return {
    childProfiles,
    loading,
    error,
    addChildProfile,
    updateChildProfile,
    deleteChildProfile,
    refreshChildProfiles: loadChildProfiles
  };
}