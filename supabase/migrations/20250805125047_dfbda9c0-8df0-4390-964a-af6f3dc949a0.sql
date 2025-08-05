-- Fix database structure and RLS for Dugsi project
-- This migration consolidates tables, improves foreign keys, and ensures proper data isolation

-- First, let's fix the function security issues by setting search_path
ALTER FUNCTION public.update_updated_at_column() SET search_path = '';
ALTER FUNCTION public.update_subscribers_updated_at() SET search_path = '';
ALTER FUNCTION public.log_event(text, uuid, jsonb, text, text, inet, text) SET search_path = '';
ALTER FUNCTION public.check_user_permission(text) SET search_path = '';
ALTER FUNCTION public.log_security_event(uuid, text, jsonb, text, text) SET search_path = '';

-- Consolidate children data: Move any missing data from 'children' to 'child_profiles'
-- and ensure child_profiles has all necessary fields
INSERT INTO public.child_profiles (
  parent_user_id, 
  name, 
  age, 
  avatar_color, 
  created_at, 
  updated_at
)
SELECT 
  user_id,
  name,
  age,
  avatar_color,
  created_at,
  updated_at
FROM public.children c
WHERE NOT EXISTS (
  SELECT 1 FROM public.child_profiles cp 
  WHERE cp.parent_user_id = c.user_id AND cp.name = c.name
);

-- Update progress table to reference child_profiles instead of children table
-- First add child_profile_id column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'progress' AND column_name = 'child_profile_id') THEN
    ALTER TABLE public.progress ADD COLUMN child_profile_id uuid REFERENCES public.child_profiles(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Update existing progress records to link to child_profiles
UPDATE public.progress p
SET child_profile_id = cp.id
FROM public.child_profiles cp, public.children c
WHERE p.user_id = cp.parent_user_id 
  AND p.child_name = cp.name
  AND c.user_id = cp.parent_user_id 
  AND c.name = cp.name
  AND p.child_profile_id IS NULL;

-- Update learning_progress to ensure proper foreign key relationships
ALTER TABLE public.learning_progress 
DROP CONSTRAINT IF EXISTS learning_progress_child_id_fkey;

ALTER TABLE public.learning_progress 
ADD CONSTRAINT learning_progress_child_id_fkey 
FOREIGN KEY (child_id) REFERENCES public.child_profiles(id) ON DELETE CASCADE;

-- Update achievement_badges to ensure proper foreign key relationships  
ALTER TABLE public.achievement_badges 
DROP CONSTRAINT IF EXISTS achievement_badges_child_id_fkey;

ALTER TABLE public.achievement_badges 
ADD CONSTRAINT achievement_badges_child_id_fkey 
FOREIGN KEY (child_id) REFERENCES public.child_profiles(id) ON DELETE CASCADE;

-- Now we can safely drop the redundant 'children' table
DROP TABLE IF EXISTS public.children CASCADE;

-- Improve RLS policies for better security and consistency

-- Enhanced RLS for progress table
DROP POLICY IF EXISTS "Users can view their own progress data" ON public.progress;
DROP POLICY IF EXISTS "Users can create their own progress data" ON public.progress;
DROP POLICY IF EXISTS "Users can update their own progress data" ON public.progress;
DROP POLICY IF EXISTS "Users can delete their own progress data" ON public.progress;

CREATE POLICY "Parents can view their children's progress" 
ON public.progress FOR SELECT 
USING (
  auth.uid() = user_id OR 
  (child_profile_id IS NOT NULL AND EXISTS (
    SELECT 1 FROM public.child_profiles cp 
    WHERE cp.id = progress.child_profile_id AND cp.parent_user_id = auth.uid()
  ))
);

CREATE POLICY "Parents can create progress for their children" 
ON public.progress FOR INSERT 
WITH CHECK (
  auth.uid() = user_id OR 
  (child_profile_id IS NOT NULL AND EXISTS (
    SELECT 1 FROM public.child_profiles cp 
    WHERE cp.id = progress.child_profile_id AND cp.parent_user_id = auth.uid()
  ))
);

CREATE POLICY "Parents can update their children's progress" 
ON public.progress FOR UPDATE 
USING (
  auth.uid() = user_id OR 
  (child_profile_id IS NOT NULL AND EXISTS (
    SELECT 1 FROM public.child_profiles cp 
    WHERE cp.id = progress.child_profile_id AND cp.parent_user_id = auth.uid()
  ))
);

CREATE POLICY "Parents can delete their children's progress" 
ON public.progress FOR DELETE 
USING (
  auth.uid() = user_id OR 
  (child_profile_id IS NOT NULL AND EXISTS (
    SELECT 1 FROM public.child_profiles cp 
    WHERE cp.id = progress.child_profile_id AND cp.parent_user_id = auth.uid()
  ))
);

-- Enhanced RLS for quiz_results table  
DROP POLICY IF EXISTS "Users can view their own quiz results" ON public.quiz_results;
DROP POLICY IF EXISTS "Users can create their own quiz results" ON public.quiz_results;
DROP POLICY IF EXISTS "Users can update their own quiz results" ON public.quiz_results;
DROP POLICY IF EXISTS "Users can delete their own quiz results" ON public.quiz_results;

-- Add child_profile_id to quiz_results if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'quiz_results' AND column_name = 'child_profile_id') THEN
    ALTER TABLE public.quiz_results ADD COLUMN child_profile_id uuid REFERENCES public.child_profiles(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Update existing quiz_results to link to child_profiles
UPDATE public.quiz_results qr
SET child_profile_id = cp.id
FROM public.child_profiles cp
WHERE qr.user_id = cp.parent_user_id 
  AND qr.child_name = cp.name
  AND qr.child_profile_id IS NULL;

CREATE POLICY "Parents can view their children's quiz results" 
ON public.quiz_results FOR SELECT 
USING (
  auth.uid() = user_id OR 
  (child_profile_id IS NOT NULL AND EXISTS (
    SELECT 1 FROM public.child_profiles cp 
    WHERE cp.id = quiz_results.child_profile_id AND cp.parent_user_id = auth.uid()
  ))
);

CREATE POLICY "Parents can create quiz results for their children" 
ON public.quiz_results FOR INSERT 
WITH CHECK (
  auth.uid() = user_id OR 
  (child_profile_id IS NOT NULL AND EXISTS (
    SELECT 1 FROM public.child_profiles cp 
    WHERE cp.id = quiz_results.child_profile_id AND cp.parent_user_id = auth.uid()
  ))
);

CREATE POLICY "Parents can update their children's quiz results" 
ON public.quiz_results FOR UPDATE 
USING (
  auth.uid() = user_id OR 
  (child_profile_id IS NOT NULL AND EXISTS (
    SELECT 1 FROM public.child_profiles cp 
    WHERE cp.id = quiz_results.child_profile_id AND cp.parent_user_id = auth.uid()
  ))
);

CREATE POLICY "Parents can delete their children's quiz results" 
ON public.quiz_results FOR DELETE 
USING (
  auth.uid() = user_id OR 
  (child_profile_id IS NOT NULL AND EXISTS (
    SELECT 1 FROM public.child_profiles cp 
    WHERE cp.id = quiz_results.child_profile_id AND cp.parent_user_id = auth.uid()
  ))
);

-- Ensure proper constraints on all tables
ALTER TABLE public.child_profiles 
ALTER COLUMN parent_user_id SET NOT NULL;

ALTER TABLE public.progress 
ALTER COLUMN user_id SET NOT NULL;

ALTER TABLE public.quiz_results 
ALTER COLUMN user_id SET NOT NULL;

-- Create indexes for better performance on foreign key lookups
CREATE INDEX IF NOT EXISTS idx_child_profiles_parent_user_id ON public.child_profiles(parent_user_id);
CREATE INDEX IF NOT EXISTS idx_progress_user_id ON public.progress(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_child_profile_id ON public.progress(child_profile_id);
CREATE INDEX IF NOT EXISTS idx_quiz_results_user_id ON public.quiz_results(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_results_child_profile_id ON public.quiz_results(child_profile_id);
CREATE INDEX IF NOT EXISTS idx_learning_progress_child_id ON public.learning_progress(child_id);
CREATE INDEX IF NOT EXISTS idx_achievement_badges_child_id ON public.achievement_badges(child_id);