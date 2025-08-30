-- Add status column to subscribers table for better status tracking
ALTER TABLE public.subscribers ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'trial';

-- Add index for better performance on status queries
CREATE INDEX IF NOT EXISTS idx_subscribers_status ON public.subscribers(status);

-- Update existing trial users to have explicit status
UPDATE public.subscribers 
SET status = CASE 
  WHEN subscribed = true THEN 'active'
  WHEN subscribed = false AND trial_end > now() THEN 'trial'
  WHEN subscribed = false AND trial_end <= now() THEN 'expired'
  ELSE 'trial'
END
WHERE status IS NULL OR status = 'trial';

-- Enable realtime for subscribers table to allow real-time UI updates
ALTER TABLE public.subscribers REPLICA IDENTITY FULL;
ALTER publication supabase_realtime ADD TABLE public.subscribers;