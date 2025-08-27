-- Manual fix for the specific user with multiple children
-- Since this user has 2 children (Amelia and Sami), we need to handle this manually
-- For now, let's assign all 'default' entries to the first child alphabetically

UPDATE quiz_results 
SET child_name = 'Amelia',
    child_profile_id = (SELECT id FROM child_profiles WHERE name = 'Amelia' AND parent_user_id = 'de8bf7e7-4c41-4be6-9dea-299c278dc2c1')
WHERE child_name = 'default' 
  AND user_id = 'de8bf7e7-4c41-4be6-9dea-299c278dc2c1';

UPDATE progress 
SET child_name = 'Amelia',
    child_profile_id = (SELECT id FROM child_profiles WHERE name = 'Amelia' AND parent_user_id = 'de8bf7e7-4c41-4be6-9dea-299c278dc2c1')
WHERE child_name = 'default' 
  AND user_id = 'de8bf7e7-4c41-4be6-9dea-299c278dc2c1';