import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface Child {
  id: string;
  name: string;
  age?: number;
  avatar_color: string;
  created_at: string;
  updated_at: string;
}

export function useChildren() {
  const { user } = useAuth();
  const [children, setChildren] = useState<Child[]>([]);
  const [loading, setLoading] = useState(true);

  const loadChildren = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('child_profiles')
        .select('*')
        .eq('parent_user_id', user.id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setChildren(data || []);
    } catch (error) {
      console.error('Error loading children:', error);
    } finally {
      setLoading(false);
    }
  };

  const addChild = async (name: string, age?: number, avatarColor = 'purple') => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('child_profiles')
        .insert({
          parent_user_id: user.id,
          name,
          age,
          avatar_color: avatarColor
        })
        .select()
        .single();

      if (error) throw error;
      setChildren(prev => [...prev, data]);
      return data;
    } catch (error) {
      console.error('Error adding child:', error);
      throw error;
    }
  };

  const deleteChild = async (childId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('child_profiles')
        .delete()
        .eq('id', childId)
        .eq('parent_user_id', user.id);

      if (error) throw error;
      setChildren(prev => prev.filter(child => child.id !== childId));
    } catch (error) {
      console.error('Error deleting child:', error);
      throw error;
    }
  };

  const updateChild = async (childId: string, updates: Partial<Pick<Child, 'name' | 'age' | 'avatar_color'>>) => {
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
      setChildren(prev => prev.map(child => child.id === childId ? data : child));
      return data;
    } catch (error) {
      console.error('Error updating child:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (user) {
      loadChildren();
    }
  }, [user]);

  return {
    children,
    loading,
    addChild,
    deleteChild,
    updateChild,
    refreshChildren: loadChildren
  };
}