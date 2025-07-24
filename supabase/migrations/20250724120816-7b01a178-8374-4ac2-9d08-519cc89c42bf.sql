-- Phase 1: Advanced Child Profile & Learning System Migration

-- Create enhanced child profiles table
CREATE TABLE IF NOT EXISTS child_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_user_id UUID NOT NULL,
    name TEXT NOT NULL,
    age INTEGER,
    learning_level TEXT CHECK (learning_level IN ('begynder', 'øvet', 'avanceret')) DEFAULT 'begynder',
    interests TEXT[] DEFAULT ARRAY[]::TEXT[],
    avatar_color TEXT DEFAULT 'purple',
    avatar_url TEXT,
    special_needs TEXT,
    preferred_learning_style TEXT CHECK (
        preferred_learning_style IN ('visuel', 'auditiv', 'kinæstetisk', 'læse/skrive')
    ) DEFAULT 'visuel',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Learning progress tracking
CREATE TABLE IF NOT EXISTS learning_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    child_id UUID REFERENCES child_profiles(id) ON DELETE CASCADE NOT NULL,
    module_id TEXT NOT NULL,
    completed_lessons INTEGER DEFAULT 0,
    total_lessons INTEGER NOT NULL DEFAULT 10,
    progress_percentage NUMERIC(5,2) DEFAULT 0,
    last_completed_lesson_date TIMESTAMPTZ,
    mastery_level TEXT CHECK (
        mastery_level IN ('påbegyndt', 'delvist', 'fuld')
    ) DEFAULT 'påbegyndt',
    difficulty_level TEXT CHECK (
        difficulty_level IN ('let', 'middel', 'svær')
    ) DEFAULT 'let',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(child_id, module_id)
);

-- Achievement badges system
CREATE TABLE IF NOT EXISTS achievement_badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    child_id UUID REFERENCES child_profiles(id) ON DELETE CASCADE NOT NULL,
    badge_name TEXT NOT NULL,
    badge_description TEXT,
    earned_date TIMESTAMPTZ DEFAULT NOW(),
    category TEXT CHECK (
        category IN ('læsning', 'matematik', 'sprog', 'videnskab', 'kreativitet', 'alfabet')
    ) DEFAULT 'læsning'
);

-- Enhanced user roles system
CREATE TABLE IF NOT EXISTS user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL,
    role TEXT NOT NULL CHECK (
        role IN ('parent', 'child', 'admin', 'educator', 'support')
    ) DEFAULT 'parent',
    permissions TEXT[] DEFAULT ARRAY['read']::TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Security audit logging
CREATE TABLE IF NOT EXISTS security_audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    action TEXT NOT NULL,
    details JSONB,
    ip_address TEXT,
    user_agent TEXT,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Migrate existing children data to child_profiles
INSERT INTO child_profiles (
    id, 
    parent_user_id, 
    name, 
    age, 
    avatar_color,
    created_at,
    updated_at
)
SELECT 
    id,
    user_id,
    name,
    age,
    avatar_color,
    created_at,
    updated_at
FROM children
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on all new tables
ALTER TABLE child_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievement_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_audit_log ENABLE ROW LEVEL SECURITY;

-- RLS Policies for child_profiles
CREATE POLICY "Parents can manage their children's profiles"
ON child_profiles FOR ALL
USING (auth.uid() = parent_user_id)
WITH CHECK (auth.uid() = parent_user_id);

-- RLS Policies for learning_progress
CREATE POLICY "Parents can view learning progress"
ON learning_progress FOR SELECT
USING (
    auth.uid() = (SELECT parent_user_id FROM child_profiles WHERE id = child_id)
);

CREATE POLICY "System can update learning progress"
ON learning_progress FOR INSERT
WITH CHECK (
    auth.uid() = (SELECT parent_user_id FROM child_profiles WHERE id = child_id)
);

CREATE POLICY "System can modify learning progress"
ON learning_progress FOR UPDATE
USING (
    auth.uid() = (SELECT parent_user_id FROM child_profiles WHERE id = child_id)
);

-- RLS Policies for achievement_badges
CREATE POLICY "Parents can view child's badges"
ON achievement_badges FOR SELECT
USING (
    auth.uid() = (SELECT parent_user_id FROM child_profiles WHERE id = child_id)
);

CREATE POLICY "System can award badges"
ON achievement_badges FOR INSERT
WITH CHECK (
    auth.uid() = (SELECT parent_user_id FROM child_profiles WHERE id = child_id)
);

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own role"
ON user_roles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
ON user_roles FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM user_roles 
        WHERE user_id = auth.uid() AND role = 'admin'
    )
);

-- RLS Policies for security_audit_log
CREATE POLICY "Users can view their own audit logs"
ON security_audit_log FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "System can create audit logs"
ON security_audit_log FOR INSERT
WITH CHECK (true);

-- Security functions
CREATE OR REPLACE FUNCTION check_user_permission(
    p_required_permission TEXT
) RETURNS BOOLEAN AS $$
DECLARE
    user_role TEXT;
BEGIN
    SELECT role INTO user_role 
    FROM user_roles 
    WHERE user_id = auth.uid();

    IF user_role = 'admin' THEN
        RETURN TRUE;
    END IF;

    RETURN EXISTS (
        SELECT 1 
        FROM user_roles 
        WHERE 
            user_id = auth.uid() AND 
            p_required_permission = ANY(permissions)
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION log_security_event(
    p_user_id UUID,
    p_action TEXT,
    p_details JSONB DEFAULT NULL,
    p_ip_address TEXT DEFAULT NULL,
    p_user_agent TEXT DEFAULT NULL
) RETURNS VOID AS $$
BEGIN
    INSERT INTO security_audit_log (
        user_id, 
        action, 
        details, 
        ip_address, 
        user_agent
    ) VALUES (
        p_user_id,
        p_action,
        p_details,
        p_ip_address,
        p_user_agent
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Triggers for updated_at fields
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_child_profiles_updated_at
    BEFORE UPDATE ON child_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_learning_progress_updated_at
    BEFORE UPDATE ON learning_progress
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_roles_updated_at
    BEFORE UPDATE ON user_roles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();