export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      achievements: {
        Row: {
          category: string
          conditions: Json
          created_at: string
          description: string
          icon: string
          id: string
          name: string
          points: number
          rarity: string
        }
        Insert: {
          category?: string
          conditions?: Json
          created_at?: string
          description: string
          icon: string
          id?: string
          name: string
          points?: number
          rarity?: string
        }
        Update: {
          category?: string
          conditions?: Json
          created_at?: string
          description?: string
          icon?: string
          id?: string
          name?: string
          points?: number
          rarity?: string
        }
        Relationships: []
      }
      ai_chat_sessions: {
        Row: {
          context_type: string | null
          created_at: string | null
          id: string
          messages: Json | null
          related_idea_id: string | null
          session_title: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          context_type?: string | null
          created_at?: string | null
          id?: string
          messages?: Json | null
          related_idea_id?: string | null
          session_title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          context_type?: string | null
          created_at?: string | null
          id?: string
          messages?: Json | null
          related_idea_id?: string | null
          session_title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_chat_sessions_related_idea_id_fkey"
            columns: ["related_idea_id"]
            isOneToOne: false
            referencedRelation: "user_ideas"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_roadmaps: {
        Row: {
          business_idea: string
          created_at: string | null
          id: string
          roadmap_content: string
          startup_name: string
          target_industry: Database["public"]["Enums"]["industry_type"]
          user_id: string | null
        }
        Insert: {
          business_idea: string
          created_at?: string | null
          id?: string
          roadmap_content: string
          startup_name: string
          target_industry: Database["public"]["Enums"]["industry_type"]
          user_id?: string | null
        }
        Update: {
          business_idea?: string
          created_at?: string | null
          id?: string
          roadmap_content?: string
          startup_name?: string
          target_industry?: Database["public"]["Enums"]["industry_type"]
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_roadmaps_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      applicant_profiles: {
        Row: {
          availability: string | null
          certifications: string[] | null
          cover_letter_template: string | null
          created_at: string
          education: string[] | null
          email: string
          experience_years: number | null
          first_name: string
          github_url: string | null
          id: string
          job_preferences: Json | null
          languages: string[] | null
          last_name: string
          linkedin_url: string | null
          location: string | null
          phone: string | null
          portfolio_url: string | null
          preferred_currency: string | null
          resume_url: string | null
          salary_expectation_max: number | null
          salary_expectation_min: number | null
          skills: string[] | null
          updated_at: string
          user_id: string
          work_experience: Json | null
        }
        Insert: {
          availability?: string | null
          certifications?: string[] | null
          cover_letter_template?: string | null
          created_at?: string
          education?: string[] | null
          email: string
          experience_years?: number | null
          first_name: string
          github_url?: string | null
          id?: string
          job_preferences?: Json | null
          languages?: string[] | null
          last_name: string
          linkedin_url?: string | null
          location?: string | null
          phone?: string | null
          portfolio_url?: string | null
          preferred_currency?: string | null
          resume_url?: string | null
          salary_expectation_max?: number | null
          salary_expectation_min?: number | null
          skills?: string[] | null
          updated_at?: string
          user_id: string
          work_experience?: Json | null
        }
        Update: {
          availability?: string | null
          certifications?: string[] | null
          cover_letter_template?: string | null
          created_at?: string
          education?: string[] | null
          email?: string
          experience_years?: number | null
          first_name?: string
          github_url?: string | null
          id?: string
          job_preferences?: Json | null
          languages?: string[] | null
          last_name?: string
          linkedin_url?: string | null
          location?: string | null
          phone?: string | null
          portfolio_url?: string | null
          preferred_currency?: string | null
          resume_url?: string | null
          salary_expectation_max?: number | null
          salary_expectation_min?: number | null
          skills?: string[] | null
          updated_at?: string
          user_id?: string
          work_experience?: Json | null
        }
        Relationships: []
      }
      case_studies: {
        Row: {
          company_name: string
          created_at: string | null
          current_valuation: string | null
          description: string
          funding: string | null
          generated_by_ai: boolean | null
          id: string
          image_url: string | null
          industry: Database["public"]["Enums"]["industry_type"]
          key_learnings: string[]
          market_scenario: string
          mvp_features: string[]
          roadmap_content: string | null
          source_url: string | null
          timeline: string
          updated_at: string | null
        }
        Insert: {
          company_name: string
          created_at?: string | null
          current_valuation?: string | null
          description: string
          funding?: string | null
          generated_by_ai?: boolean | null
          id?: string
          image_url?: string | null
          industry: Database["public"]["Enums"]["industry_type"]
          key_learnings: string[]
          market_scenario: string
          mvp_features: string[]
          roadmap_content?: string | null
          source_url?: string | null
          timeline: string
          updated_at?: string | null
        }
        Update: {
          company_name?: string
          created_at?: string | null
          current_valuation?: string | null
          description?: string
          funding?: string | null
          generated_by_ai?: boolean | null
          id?: string
          image_url?: string | null
          industry?: Database["public"]["Enums"]["industry_type"]
          key_learnings?: string[]
          market_scenario?: string
          mvp_features?: string[]
          roadmap_content?: string | null
          source_url?: string | null
          timeline?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      challenge_participations: {
        Row: {
          challenge_id: string
          completed: boolean | null
          completion_date: string | null
          created_at: string
          id: string
          progress: Json | null
          rank: number | null
          user_id: string
        }
        Insert: {
          challenge_id: string
          completed?: boolean | null
          completion_date?: string | null
          created_at?: string
          id?: string
          progress?: Json | null
          rank?: number | null
          user_id: string
        }
        Update: {
          challenge_id?: string
          completed?: boolean | null
          completion_date?: string | null
          created_at?: string
          id?: string
          progress?: Json | null
          rank?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "challenge_participations_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
        ]
      }
      challenges: {
        Row: {
          challenge_type: string
          created_at: string
          current_participants: number | null
          description: string
          end_date: string
          id: string
          is_active: boolean | null
          max_participants: number | null
          requirements: Json
          rewards: Json
          start_date: string
          title: string
        }
        Insert: {
          challenge_type?: string
          created_at?: string
          current_participants?: number | null
          description: string
          end_date: string
          id?: string
          is_active?: boolean | null
          max_participants?: number | null
          requirements?: Json
          rewards?: Json
          start_date: string
          title: string
        }
        Update: {
          challenge_type?: string
          created_at?: string
          current_participants?: number | null
          description?: string
          end_date?: string
          id?: string
          is_active?: boolean | null
          max_participants?: number | null
          requirements?: Json
          rewards?: Json
          start_date?: string
          title?: string
        }
        Relationships: []
      }
      enhanced_profiles: {
        Row: {
          bio: string | null
          company_name: string | null
          company_size: string | null
          created_at: string | null
          github_url: string | null
          id: string
          industry: string | null
          interests: string[] | null
          job_title: string | null
          linkedin_url: string | null
          location: string | null
          notification_preferences: Json | null
          onboarding_completed: boolean | null
          portfolio_url: string | null
          premium_user: boolean | null
          skills: string[] | null
          timezone: string | null
          updated_at: string | null
          user_id: string
          years_of_experience: number | null
        }
        Insert: {
          bio?: string | null
          company_name?: string | null
          company_size?: string | null
          created_at?: string | null
          github_url?: string | null
          id?: string
          industry?: string | null
          interests?: string[] | null
          job_title?: string | null
          linkedin_url?: string | null
          location?: string | null
          notification_preferences?: Json | null
          onboarding_completed?: boolean | null
          portfolio_url?: string | null
          premium_user?: boolean | null
          skills?: string[] | null
          timezone?: string | null
          updated_at?: string | null
          user_id: string
          years_of_experience?: number | null
        }
        Update: {
          bio?: string | null
          company_name?: string | null
          company_size?: string | null
          created_at?: string | null
          github_url?: string | null
          id?: string
          industry?: string | null
          interests?: string[] | null
          job_title?: string | null
          linkedin_url?: string | null
          location?: string | null
          notification_preferences?: Json | null
          onboarding_completed?: boolean | null
          portfolio_url?: string | null
          premium_user?: boolean | null
          skills?: string[] | null
          timezone?: string | null
          updated_at?: string | null
          user_id?: string
          years_of_experience?: number | null
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          applicant_id: string
          applied_at: string
          cover_letter: string | null
          id: string
          job_id: string
          resume_url: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          applicant_id: string
          applied_at?: string
          cover_letter?: string | null
          id?: string
          job_id: string
          resume_url?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          applicant_id?: string
          applied_at?: string
          cover_letter?: string | null
          id?: string
          job_id?: string
          resume_url?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "job_postings"
            referencedColumns: ["id"]
          },
        ]
      }
      job_postings: {
        Row: {
          application_deadline: string | null
          application_email: string | null
          application_url: string | null
          benefits: string[] | null
          company_name: string
          created_at: string
          currency: string | null
          experience_level: string | null
          featured: boolean | null
          id: string
          is_active: boolean | null
          job_description: string
          job_title: string
          job_type: string | null
          location: string | null
          salary_max: number | null
          salary_min: number | null
          skills_required: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          application_deadline?: string | null
          application_email?: string | null
          application_url?: string | null
          benefits?: string[] | null
          company_name: string
          created_at?: string
          currency?: string | null
          experience_level?: string | null
          featured?: boolean | null
          id?: string
          is_active?: boolean | null
          job_description: string
          job_title: string
          job_type?: string | null
          location?: string | null
          salary_max?: number | null
          salary_min?: number | null
          skills_required?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          application_deadline?: string | null
          application_email?: string | null
          application_url?: string | null
          benefits?: string[] | null
          company_name?: string
          created_at?: string
          currency?: string | null
          experience_level?: string | null
          featured?: boolean | null
          id?: string
          is_active?: boolean | null
          job_description?: string
          job_title?: string
          job_type?: string | null
          location?: string | null
          salary_max?: number | null
          salary_min?: number | null
          skills_required?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          action_url: string | null
          created_at: string | null
          id: string
          message: string
          metadata: Json | null
          read: boolean | null
          title: string
          type: string
          user_id: string | null
        }
        Insert: {
          action_url?: string | null
          created_at?: string | null
          id?: string
          message: string
          metadata?: Json | null
          read?: boolean | null
          title: string
          type: string
          user_id?: string | null
        }
        Update: {
          action_url?: string | null
          created_at?: string | null
          id?: string
          message?: string
          metadata?: Json | null
          read?: boolean | null
          title?: string
          type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      post_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          parent_comment_id: string | null
          post_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          parent_comment_id?: string | null
          post_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          parent_comment_id?: string | null
          post_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_comments_parent_comment_id_fkey"
            columns: ["parent_comment_id"]
            isOneToOne: false
            referencedRelation: "post_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_likes: {
        Row: {
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          content: string
          created_at: string
          id: string
          image_url: string | null
          is_public: boolean | null
          link_description: string | null
          link_title: string | null
          link_url: string | null
          post_type: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          image_url?: string | null
          is_public?: boolean | null
          link_description?: string | null
          link_title?: string | null
          link_url?: string | null
          post_type?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          image_url?: string | null
          is_public?: boolean | null
          link_description?: string | null
          link_title?: string | null
          link_url?: string | null
          post_type?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          company_name: string | null
          created_at: string | null
          full_name: string | null
          id: string
          industry: string | null
          role: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          company_name?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          industry?: string | null
          role?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          company_name?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          industry?: string | null
          role?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      real_time_analytics: {
        Row: {
          action_type: string
          created_at: string | null
          id: string
          ip_address: unknown | null
          metadata: Json | null
          page_path: string
          session_id: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action_type: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          page_path: string
          session_id: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action_type?: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          page_path?: string
          session_id?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      startup_news: {
        Row: {
          author: string | null
          category: string
          content: string | null
          created_at: string
          description: string
          featured: boolean | null
          id: string
          image_url: string | null
          publish_date: string
          source_url: string | null
          tags: string[] | null
          title: string
          views_count: number
        }
        Insert: {
          author?: string | null
          category?: string
          content?: string | null
          created_at?: string
          description: string
          featured?: boolean | null
          id?: string
          image_url?: string | null
          publish_date?: string
          source_url?: string | null
          tags?: string[] | null
          title: string
          views_count?: number
        }
        Update: {
          author?: string | null
          category?: string
          content?: string | null
          created_at?: string
          description?: string
          featured?: boolean | null
          id?: string
          image_url?: string | null
          publish_date?: string
          source_url?: string | null
          tags?: string[] | null
          title?: string
          views_count?: number
        }
        Relationships: []
      }
      topic_discussions: {
        Row: {
          content: string
          created_at: string
          id: string
          likes_count: number
          topic_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          likes_count?: number
          topic_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          likes_count?: number
          topic_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "topic_discussions_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "trending_topics"
            referencedColumns: ["id"]
          },
        ]
      }
      trending_topics: {
        Row: {
          category: string
          created_at: string
          description: string
          discussion_count: number
          id: string
          title: string
          trending_score: number
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          discussion_count?: number
          id?: string
          title: string
          trending_score?: number
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          discussion_count?: number
          id?: string
          title?: string
          trending_score?: number
          updated_at?: string
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_id: string
          earned_at: string
          id: string
          progress: number | null
          user_id: string
        }
        Insert: {
          achievement_id: string
          earned_at?: string
          id?: string
          progress?: number | null
          user_id: string
        }
        Update: {
          achievement_id?: string
          earned_at?: string
          id?: string
          progress?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
        ]
      }
      user_analytics: {
        Row: {
          created_at: string | null
          event_data: Json | null
          event_type: string
          id: string
          page_url: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_data?: Json | null
          event_type: string
          id?: string
          page_url?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_data?: Json | null
          event_type?: string
          id?: string
          page_url?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_analytics_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_bookmarks: {
        Row: {
          content_id: string
          content_type: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          content_id: string
          content_type: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          content_id?: string
          content_type?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      user_engagement: {
        Row: {
          created_at: string | null
          date: string | null
          id: string
          metadata: Json | null
          metric_type: string
          metric_value: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          date?: string | null
          id?: string
          metadata?: Json | null
          metric_type: string
          metric_value?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string | null
          id?: string
          metadata?: Json | null
          metric_type?: string
          metric_value?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_favorites: {
        Row: {
          case_study_id: string | null
          created_at: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          case_study_id?: string | null
          created_at?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          case_study_id?: string | null
          created_at?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_favorites_case_study_id_fkey"
            columns: ["case_study_id"]
            isOneToOne: false
            referencedRelation: "case_studies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_favorites_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_ideas: {
        Row: {
          created_at: string
          description: string
          id: string
          industry: string | null
          problem_solved: string | null
          status: string | null
          target_audience: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          industry?: string | null
          problem_solved?: string | null
          status?: string | null
          target_audience?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          industry?: string | null
          problem_solved?: string | null
          status?: string | null
          target_audience?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_stats: {
        Row: {
          comments_made: number
          created_at: string
          id: string
          ideas_submitted: number
          last_login: string | null
          level: number
          likes_given: number
          likes_received: number
          login_streak: number
          total_xp: number
          updated_at: string
          user_id: string
        }
        Insert: {
          comments_made?: number
          created_at?: string
          id?: string
          ideas_submitted?: number
          last_login?: string | null
          level?: number
          likes_given?: number
          likes_received?: number
          login_streak?: number
          total_xp?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          comments_made?: number
          created_at?: string
          id?: string
          ideas_submitted?: number
          last_login?: string | null
          level?: number
          likes_given?: number
          likes_received?: number
          login_streak?: number
          total_xp?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      industry_type:
        | "fintech"
        | "edtech"
        | "healthtech"
        | "ecommerce"
        | "saas"
        | "marketplace"
        | "social"
        | "gaming"
        | "ai_ml"
        | "blockchain"
        | "iot"
        | "other"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      industry_type: [
        "fintech",
        "edtech",
        "healthtech",
        "ecommerce",
        "saas",
        "marketplace",
        "social",
        "gaming",
        "ai_ml",
        "blockchain",
        "iot",
        "other",
      ],
    },
  },
} as const
