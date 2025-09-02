-- Update existing subscriber to have 2-minute trial from now
UPDATE public.subscribers 
SET 
  trial_end = now() + interval '2 minutes',
  status = 'trial',
  updated_at = now()
WHERE email = 'abdi.dk1@gmail.com';

-- Change default trial period from 24 hours to 2 minutes for new subscribers
ALTER TABLE public.subscribers 
ALTER COLUMN trial_end SET DEFAULT (now() + interval '2 minutes');