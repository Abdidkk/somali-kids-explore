-- Enable realtime for progress table
ALTER TABLE public.progress REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.progress;