-- Add num_kids and billing_interval columns to subscribers table
ALTER TABLE public.subscribers 
ADD COLUMN num_kids INTEGER DEFAULT 0,
ADD COLUMN billing_interval TEXT DEFAULT 'monthly';

-- Update trigger to handle new columns
CREATE OR REPLACE FUNCTION public.update_subscribers_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;