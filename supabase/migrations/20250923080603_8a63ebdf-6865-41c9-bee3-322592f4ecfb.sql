-- Fix search path security warnings
CREATE OR REPLACE FUNCTION public.danish_now() 
RETURNS timestamptz AS $$
BEGIN
    RETURN (now() AT TIME ZONE 'Europe/Copenhagen');
END;
$$ LANGUAGE plpgsql IMMUTABLE SET search_path = '';

CREATE OR REPLACE FUNCTION public.is_trial_expired_danish(trial_end_time timestamptz)
RETURNS boolean AS $$
BEGIN
    RETURN (now() AT TIME ZONE 'Europe/Copenhagen') > (trial_end_time AT TIME ZONE 'Europe/Copenhagen');
END;
$$ LANGUAGE plpgsql IMMUTABLE SET search_path = '';