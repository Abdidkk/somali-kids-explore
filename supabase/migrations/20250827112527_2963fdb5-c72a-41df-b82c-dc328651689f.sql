-- Add missing unique constraint for child_profile_id based operations
-- This constraint allows the onConflict logic in quizRecorder.ts to work properly
ALTER TABLE public.progress 
ADD CONSTRAINT progress_user_child_profile_category_unique 
UNIQUE (user_id, child_profile_id, category);