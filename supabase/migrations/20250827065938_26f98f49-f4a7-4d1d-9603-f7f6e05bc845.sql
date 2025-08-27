-- Fix existing 'default' child_name entries by mapping them to actual child names
-- This handles cases where data was saved with 'default' instead of real child names

-- Update quiz_results table
-- For users with only one child, update all 'default' entries to that child's name
UPDATE quiz_results 
SET child_name = child_profiles.name,
    child_profile_id = child_profiles.id
FROM child_profiles 
WHERE quiz_results.child_name = 'default'
  AND quiz_results.user_id = child_profiles.parent_user_id
  AND child_profiles.parent_user_id IN (
    -- Only users with exactly one child profile
    SELECT parent_user_id 
    FROM child_profiles 
    GROUP BY parent_user_id 
    HAVING COUNT(*) = 1
  );

-- Update progress table  
-- For users with only one child, update all 'default' entries to that child's name
UPDATE progress 
SET child_name = child_profiles.name,
    child_profile_id = child_profiles.id
FROM child_profiles 
WHERE progress.child_name = 'default'
  AND progress.user_id = child_profiles.parent_user_id
  AND child_profiles.parent_user_id IN (
    -- Only users with exactly one child profile
    SELECT parent_user_id 
    FROM child_profiles 
    GROUP BY parent_user_id 
    HAVING COUNT(*) = 1
  );

-- For users with multiple children, we'll handle this case-by-case
-- as we can't automatically determine which child the 'default' entries belong to