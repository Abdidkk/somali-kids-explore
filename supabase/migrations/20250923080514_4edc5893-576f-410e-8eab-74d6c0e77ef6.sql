-- Add timezone support for Danish local time calculations
-- Create a function to convert to Danish time
CREATE OR REPLACE FUNCTION public.danish_now() 
RETURNS timestamptz AS $$
BEGIN
    RETURN (now() AT TIME ZONE 'Europe/Copenhagen');
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Add field for storing trial end in Danish local time for reference
ALTER TABLE public.subscribers 
ADD COLUMN IF NOT EXISTS trial_end_local timestamptz;

-- Update existing trial_end records to set precise 24-hour trial from creation
UPDATE public.subscribers 
SET trial_end = created_at + INTERVAL '24 hours',
    trial_end_local = (created_at AT TIME ZONE 'Europe/Copenhagen') + INTERVAL '24 hours'
WHERE trial_end IS NOT NULL 
AND trial_end = created_at + INTERVAL '2 minutes'; -- Only update the default 2-minute trials

-- Create function to check if trial has expired in Danish time
CREATE OR REPLACE FUNCTION public.is_trial_expired_danish(trial_end_time timestamptz)
RETURNS boolean AS $$
BEGIN
    RETURN (now() AT TIME ZONE 'Europe/Copenhagen') > (trial_end_time AT TIME ZONE 'Europe/Copenhagen');
END;
$$ LANGUAGE plpgsql IMMUTABLE;