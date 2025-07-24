-- Phase 1: Performance Optimization with Indexes
BEGIN;

-- Children Table Indexes
CREATE INDEX IF NOT EXISTS idx_children_user_id ON children(user_id);
CREATE INDEX IF NOT EXISTS idx_children_name ON children(name);
CREATE INDEX IF NOT EXISTS idx_children_age ON children(age);
CREATE INDEX IF NOT EXISTS idx_children_user_name ON children(user_id, name); -- Composite index

-- Progress Table Indexes
CREATE INDEX IF NOT EXISTS idx_progress_user_id ON progress(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_child_name ON progress(child_name);
CREATE INDEX IF NOT EXISTS idx_progress_category ON progress(category);
CREATE INDEX IF NOT EXISTS idx_progress_total_points ON progress(total_points);
CREATE INDEX IF NOT EXISTS idx_progress_user_child ON progress(user_id, child_name); -- Composite index
CREATE INDEX IF NOT EXISTS idx_progress_user_category ON progress(user_id, category); -- Composite index

-- Quiz Results Indexes
CREATE INDEX IF NOT EXISTS idx_quiz_results_user_id ON quiz_results(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_results_child_name ON quiz_results(child_name);
CREATE INDEX IF NOT EXISTS idx_quiz_results_category ON quiz_results(category);
CREATE INDEX IF NOT EXISTS idx_quiz_results_score ON quiz_results(score);
CREATE INDEX IF NOT EXISTS idx_quiz_results_created_at ON quiz_results(created_at);
CREATE INDEX IF NOT EXISTS idx_quiz_results_user_child ON quiz_results(user_id, child_name); -- Composite index
CREATE INDEX IF NOT EXISTS idx_quiz_results_user_category ON quiz_results(user_id, category); -- Composite index

-- Subscribers Indexes
CREATE INDEX IF NOT EXISTS idx_subscribers_user_id ON subscribers(user_id);
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);
CREATE INDEX IF NOT EXISTS idx_subscribers_subscription_status ON subscribers(subscribed, subscription_end);
CREATE INDEX IF NOT EXISTS idx_subscribers_stripe_customer ON subscribers(stripe_customer_id);

-- Phase 2: Transactions Table for Enhanced Stripe Tracking
CREATE TABLE IF NOT EXISTS public.transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    subscriber_id UUID REFERENCES public.subscribers(id) ON DELETE SET NULL,
    stripe_transaction_id TEXT UNIQUE,
    stripe_session_id TEXT,
    amount NUMERIC(10,2) NOT NULL,
    currency TEXT NOT NULL DEFAULT 'DKK',
    status TEXT NOT NULL, -- 'succeeded', 'pending', 'failed', 'canceled'
    subscription_tier TEXT,
    billing_interval TEXT,
    num_kids INTEGER DEFAULT 0,
    metadata JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS for transactions
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for transactions
CREATE POLICY "Users can view own transactions"
ON public.transactions FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Service can insert transactions"
ON public.transactions FOR INSERT
WITH CHECK (true);

CREATE POLICY "Service can update transactions"
ON public.transactions FOR UPDATE
USING (true);

-- Indexes for transactions
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON public.transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_stripe_id ON public.transactions(stripe_transaction_id);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON public.transactions(status);
CREATE INDEX IF NOT EXISTS idx_transactions_session_id ON public.transactions(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON public.transactions(created_at);

-- Phase 3: Event Logs Table for Enhanced Logging
CREATE TABLE IF NOT EXISTS public.event_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type TEXT NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    child_name TEXT,
    metadata JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS for event_logs
ALTER TABLE public.event_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for event_logs
CREATE POLICY "Users can view own event logs"
ON public.event_logs FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Service can insert event logs"
ON public.event_logs FOR INSERT
WITH CHECK (true);

-- Indexes for event_logs
CREATE INDEX IF NOT EXISTS idx_event_logs_user_id ON public.event_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_event_logs_event_type ON public.event_logs(event_type);
CREATE INDEX IF NOT EXISTS idx_event_logs_created_at ON public.event_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_event_logs_user_event ON public.event_logs(user_id, event_type);

-- Add updated_at trigger for transactions
CREATE TRIGGER update_transactions_updated_at
    BEFORE UPDATE ON public.transactions
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

COMMIT;