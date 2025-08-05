-- Initialize user roles for existing users
-- This ensures all users have proper role assignments for security

-- Insert default 'parent' role for all existing users who don't have a role yet
INSERT INTO public.user_roles (user_id, role, permissions)
SELECT 
  u.id,
  'parent'::text,
  ARRAY['read', 'write', 'manage_children']::text[]
FROM public.users u
WHERE NOT EXISTS (
  SELECT 1 FROM public.user_roles ur 
  WHERE ur.user_id = u.id
);

-- Create a function to automatically assign roles to new users
CREATE OR REPLACE FUNCTION public.assign_default_user_role()
RETURNS TRIGGER AS $$
BEGIN
  -- Assign default 'parent' role to new users
  INSERT INTO public.user_roles (user_id, role, permissions)
  VALUES (
    NEW.id,
    'parent'::text,
    ARRAY['read', 'write', 'manage_children']::text[]
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically assign roles when users are created
DROP TRIGGER IF EXISTS on_user_created_assign_role ON public.users;
CREATE TRIGGER on_user_created_assign_role
  AFTER INSERT ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.assign_default_user_role();