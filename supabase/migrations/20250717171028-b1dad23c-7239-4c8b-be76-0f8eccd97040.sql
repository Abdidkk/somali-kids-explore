-- Create progress table for tracking children's learning progress
CREATE TABLE public.progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  child_name TEXT NOT NULL,
  category TEXT NOT NULL,
  total_points INTEGER NOT NULL DEFAULT 0,
  activities_completed INTEGER NOT NULL DEFAULT 0,
  time_spent INTEGER NOT NULL DEFAULT 0, -- in seconds
  category_enabled BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, child_name, category)
);

-- Create quiz_results table for detailed quiz results
CREATE TABLE public.quiz_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  child_name TEXT NOT NULL,
  category TEXT NOT NULL,
  activity_name TEXT NOT NULL,
  score INTEGER NOT NULL,
  max_score INTEGER NOT NULL,
  answers JSONB NOT NULL,
  completion_time INTEGER, -- in seconds
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for progress table
CREATE POLICY "Users can view their own progress data" 
ON public.progress 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own progress data" 
ON public.progress 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress data" 
ON public.progress 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own progress data" 
ON public.progress 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create RLS policies for quiz_results table
CREATE POLICY "Users can view their own quiz results" 
ON public.quiz_results 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own quiz results" 
ON public.quiz_results 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own quiz results" 
ON public.quiz_results 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own quiz results" 
ON public.quiz_results 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates on progress table
CREATE TRIGGER update_progress_updated_at
BEFORE UPDATE ON public.progress
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_progress_user_id ON public.progress(user_id);
CREATE INDEX idx_progress_child_category ON public.progress(user_id, child_name, category);
CREATE INDEX idx_quiz_results_user_id ON public.quiz_results(user_id);
CREATE INDEX idx_quiz_results_child_category ON public.quiz_results(user_id, child_name, category);
CREATE INDEX idx_quiz_results_created_at ON public.quiz_results(created_at DESC);