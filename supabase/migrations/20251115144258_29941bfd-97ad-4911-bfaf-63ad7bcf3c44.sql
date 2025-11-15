-- Add is_active column to child_profiles table
ALTER TABLE child_profiles 
ADD COLUMN is_active boolean DEFAULT true;

-- Create index for efficient querying of active/inactive children
CREATE INDEX idx_child_profiles_active ON child_profiles(parent_user_id, is_active);

-- Add comment to explain the column
COMMENT ON COLUMN child_profiles.is_active IS 'Indicates if the child profile is active based on subscription payment. Inactive children cannot access learning features.';