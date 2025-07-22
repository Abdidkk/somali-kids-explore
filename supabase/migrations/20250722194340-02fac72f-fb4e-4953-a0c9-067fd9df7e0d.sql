
-- Create a children table to store child profiles
CREATE TABLE public.children (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  age INTEGER,
  avatar_color TEXT DEFAULT 'purple',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, name)
);

-- Enable Row Level Security
ALTER TABLE public.children ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for children table
CREATE POLICY "Users can view their own children" 
ON public.children 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own children" 
ON public.children 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own children" 
ON public.children 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own children" 
ON public.children 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates on children table
CREATE TRIGGER update_children_updated_at
BEFORE UPDATE ON public.children
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_children_user_id ON public.children(user_id);
CREATE INDEX idx_children_user_name ON public.children(user_id, name);
