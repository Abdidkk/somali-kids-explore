export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      achievement_badges: {
        Row: {
          badge_description: string | null
          badge_name: string
          category: string | null
          child_id: string
          earned_date: string | null
          id: string
        }
        Insert: {
          badge_description?: string | null
          badge_name: string
          category?: string | null
          child_id: string
          earned_date?: string | null
          id?: string
        }
        Update: {
          badge_description?: string | null
          badge_name?: string
          category?: string | null
          child_id?: string
          earned_date?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "achievement_badges_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "child_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      child_profiles: {
        Row: {
          age: number | null
          avatar_color: string | null
          avatar_url: string | null
          created_at: string | null
          id: string
          interests: string[] | null
          learning_level: string | null
          name: string
          parent_user_id: string
          preferred_learning_style: string | null
          special_needs: string | null
          updated_at: string | null
        }
        Insert: {
          age?: number | null
          avatar_color?: string | null
          avatar_url?: string | null
          created_at?: string | null
          id?: string
          interests?: string[] | null
          learning_level?: string | null
          name: string
          parent_user_id: string
          preferred_learning_style?: string | null
          special_needs?: string | null
          updated_at?: string | null
        }
        Update: {
          age?: number | null
          avatar_color?: string | null
          avatar_url?: string | null
          created_at?: string | null
          id?: string
          interests?: string[] | null
          learning_level?: string | null
          name?: string
          parent_user_id?: string
          preferred_learning_style?: string | null
          special_needs?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      event_logs: {
        Row: {
          child_name: string | null
          created_at: string
          event_type: string
          id: string
          ip_address: unknown | null
          metadata: Json | null
          severity: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          child_name?: string | null
          created_at?: string
          event_type: string
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          severity?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          child_name?: string | null
          created_at?: string
          event_type?: string
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          severity?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      learning_progress: {
        Row: {
          child_id: string
          completed_lessons: number | null
          created_at: string | null
          difficulty_level: string | null
          id: string
          last_completed_lesson_date: string | null
          mastery_level: string | null
          module_id: string
          progress_percentage: number | null
          total_lessons: number
          updated_at: string | null
        }
        Insert: {
          child_id: string
          completed_lessons?: number | null
          created_at?: string | null
          difficulty_level?: string | null
          id?: string
          last_completed_lesson_date?: string | null
          mastery_level?: string | null
          module_id: string
          progress_percentage?: number | null
          total_lessons?: number
          updated_at?: string | null
        }
        Update: {
          child_id?: string
          completed_lessons?: number | null
          created_at?: string | null
          difficulty_level?: string | null
          id?: string
          last_completed_lesson_date?: string | null
          mastery_level?: string | null
          module_id?: string
          progress_percentage?: number | null
          total_lessons?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "learning_progress_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "child_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      progress: {
        Row: {
          activities_completed: number
          category: string
          category_enabled: boolean
          child_name: string
          child_profile_id: string | null
          created_at: string
          finished: boolean
          id: string
          time_spent: number
          total_points: number
          updated_at: string
          user_id: string
        }
        Insert: {
          activities_completed?: number
          category: string
          category_enabled?: boolean
          child_name: string
          child_profile_id?: string | null
          created_at?: string
          finished?: boolean
          id?: string
          time_spent?: number
          total_points?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          activities_completed?: number
          category?: string
          category_enabled?: boolean
          child_name?: string
          child_profile_id?: string | null
          created_at?: string
          finished?: boolean
          id?: string
          time_spent?: number
          total_points?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "progress_child_profile_id_fkey"
            columns: ["child_profile_id"]
            isOneToOne: false
            referencedRelation: "child_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_results: {
        Row: {
          activity_name: string
          answers: Json
          category: string
          child_name: string
          child_profile_id: string | null
          completion_time: number | null
          created_at: string
          id: string
          max_score: number
          points_awarded: number
          score: number
          user_id: string
        }
        Insert: {
          activity_name: string
          answers: Json
          category: string
          child_name: string
          child_profile_id?: string | null
          completion_time?: number | null
          created_at?: string
          id?: string
          max_score: number
          points_awarded?: number
          score: number
          user_id: string
        }
        Update: {
          activity_name?: string
          answers?: Json
          category?: string
          child_name?: string
          child_profile_id?: string | null
          completion_time?: number | null
          created_at?: string
          id?: string
          max_score?: number
          points_awarded?: number
          score?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_results_child_profile_id_fkey"
            columns: ["child_profile_id"]
            isOneToOne: false
            referencedRelation: "child_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      security_audit_log: {
        Row: {
          action: string
          details: Json | null
          id: string
          ip_address: string | null
          timestamp: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          details?: Json | null
          id?: string
          ip_address?: string | null
          timestamp?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          details?: Json | null
          id?: string
          ip_address?: string | null
          timestamp?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          billing_interval: string | null
          created_at: string
          email: string
          id: string
          num_kids: number | null
          stripe_customer_id: string | null
          subscribed: boolean
          subscription_end: string | null
          subscription_tier: string | null
          trial_end: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          billing_interval?: string | null
          created_at?: string
          email: string
          id?: string
          num_kids?: number | null
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          trial_end?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          billing_interval?: string | null
          created_at?: string
          email?: string
          id?: string
          num_kids?: number | null
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          trial_end?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          billing_interval: string | null
          created_at: string
          currency: string
          id: string
          metadata: Json | null
          num_kids: number | null
          status: string
          stripe_session_id: string | null
          stripe_transaction_id: string | null
          subscriber_id: string | null
          subscription_tier: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount: number
          billing_interval?: string | null
          created_at?: string
          currency?: string
          id?: string
          metadata?: Json | null
          num_kids?: number | null
          status: string
          stripe_session_id?: string | null
          stripe_transaction_id?: string | null
          subscriber_id?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          billing_interval?: string | null
          created_at?: string
          currency?: string
          id?: string
          metadata?: Json | null
          num_kids?: number | null
          status?: string
          stripe_session_id?: string | null
          stripe_transaction_id?: string | null
          subscriber_id?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_subscriber_id_fkey"
            columns: ["subscriber_id"]
            isOneToOne: false
            referencedRelation: "subscribers"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          permissions: string[] | null
          role: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          permissions?: string[] | null
          role?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          permissions?: string[] | null
          role?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          reset_token: string | null
          reset_token_expires_at: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
          reset_token?: string | null
          reset_token_expires_at?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          reset_token?: string | null
          reset_token_expires_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_user_permission: {
        Args: { p_required_permission: string }
        Returns: boolean
      }
      log_event: {
        Args: {
          p_event_type: string
          p_user_id?: string
          p_metadata?: Json
          p_severity?: string
          p_child_name?: string
          p_ip_address?: unknown
          p_user_agent?: string
        }
        Returns: undefined
      }
      log_security_event: {
        Args: {
          p_user_id: string
          p_action: string
          p_details?: Json
          p_ip_address?: string
          p_user_agent?: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
