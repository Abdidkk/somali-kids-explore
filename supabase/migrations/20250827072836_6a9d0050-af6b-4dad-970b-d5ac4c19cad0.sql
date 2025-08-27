-- Clean up any remaining "default" entries in the database
-- Update progress table to remove/update "default" child_name entries
UPDATE progress 
SET child_name = 'Unknown Child' 
WHERE child_name = 'default' OR child_name IS NULL;

-- Update quiz_results table to remove/update "default" child_name entries  
UPDATE quiz_results 
SET child_name = 'Unknown Child'
WHERE child_name = 'default' OR child_name IS NULL;