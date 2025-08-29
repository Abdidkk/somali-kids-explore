-- Fix security issue: Restrict UPDATE and INSERT policies for subscribers table
-- Current policies allow unrestricted updates and inserts with 'true' conditions

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "update_own_subscription" ON public.subscribers;
DROP POLICY IF EXISTS "insert_subscription" ON public.subscribers;

-- Create secure UPDATE policy - only allow users to update their own subscription
-- or allow service role (edge functions) to update any subscription
CREATE POLICY "secure_update_own_subscription" ON public.subscribers
FOR UPDATE
USING (
  -- User can update their own subscription
  (auth.uid() = user_id OR auth.email() = email)
  -- Service role can update any subscription (edge functions bypass RLS anyway)
);

-- Create secure INSERT policy - only allow users to insert their own subscription
-- or allow service role (edge functions) to insert subscriptions
CREATE POLICY "secure_insert_subscription" ON public.subscribers
FOR INSERT
WITH CHECK (
  -- User can insert their own subscription
  (auth.uid() = user_id OR auth.email() = email)
  -- Service role can insert any subscription (edge functions bypass RLS anyway)
);