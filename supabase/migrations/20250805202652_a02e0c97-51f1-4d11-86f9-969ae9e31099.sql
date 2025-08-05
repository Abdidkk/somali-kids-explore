-- Fix function search path security issue
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';