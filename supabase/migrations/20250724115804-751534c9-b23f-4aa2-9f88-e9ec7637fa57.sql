-- Phase 1: Database Forberedelse - Forbedret event_logs og logging system

-- Tilføj severity column til eksisterende event_logs tabel
ALTER TABLE public.event_logs 
ADD COLUMN IF NOT EXISTS severity TEXT DEFAULT 'INFO' 
CHECK (severity IN ('DEBUG', 'INFO', 'WARNING', 'ERROR', 'CRITICAL'));

-- Tilføj manglende columns hvis de ikke eksisterer
ALTER TABLE public.event_logs 
ADD COLUMN IF NOT EXISTS child_name TEXT,
ADD COLUMN IF NOT EXISTS ip_address INET,
ADD COLUMN IF NOT EXISTS user_agent TEXT;

-- Tilføj indexes til event_logs for bedre performance
CREATE INDEX IF NOT EXISTS idx_event_logs_user_id ON public.event_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_event_logs_event_type ON public.event_logs(event_type);
CREATE INDEX IF NOT EXISTS idx_event_logs_created_at ON public.event_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_event_logs_severity ON public.event_logs(severity);

-- Opdater RLS policies for event_logs
DROP POLICY IF EXISTS "Service can insert event logs" ON public.event_logs;
DROP POLICY IF EXISTS "Users can view own event logs" ON public.event_logs;

-- Opret forbedrede RLS policies
CREATE POLICY "Service can insert event logs" 
ON public.event_logs FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Service can update event logs"
ON public.event_logs FOR UPDATE
USING (true);

CREATE POLICY "Users can view own event logs"
ON public.event_logs FOR SELECT 
USING (auth.uid() = user_id);

-- Opret sikker event logging funktion
CREATE OR REPLACE FUNCTION public.log_event(
    p_event_type TEXT, 
    p_user_id UUID DEFAULT NULL, 
    p_metadata JSONB DEFAULT NULL,
    p_severity TEXT DEFAULT 'INFO',
    p_child_name TEXT DEFAULT NULL,
    p_ip_address INET DEFAULT NULL,
    p_user_agent TEXT DEFAULT NULL
) RETURNS VOID AS $$
BEGIN
    INSERT INTO public.event_logs (
        event_type, 
        user_id, 
        metadata, 
        severity,
        child_name,
        ip_address,
        user_agent,
        created_at
    )
    VALUES (
        p_event_type, 
        p_user_id, 
        p_metadata, 
        p_severity,
        p_child_name,
        p_ip_address,
        p_user_agent,
        now()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;