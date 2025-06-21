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
      assessments: {
        Row: {
          age: number
          assessment_type: string
          created_at: string
          gender: string
          id: string
          lifestyle_factors: Json | null
          patient_name: string
          recommendations: string[] | null
          risk_level: string
          user_id: string
        }
        Insert: {
          age: number
          assessment_type: string
          created_at?: string
          gender: string
          id?: string
          lifestyle_factors?: Json | null
          patient_name: string
          recommendations?: string[] | null
          risk_level: string
          user_id: string
        }
        Update: {
          age?: number
          assessment_type?: string
          created_at?: string
          gender?: string
          id?: string
          lifestyle_factors?: Json | null
          patient_name?: string
          recommendations?: string[] | null
          risk_level?: string
          user_id?: string
        }
        Relationships: []
      }
      doctors: {
        Row: {
          created_at: string
          experience: string
          id: string
          location: string
          name: string
          specialization: string
          summary: string | null
          budget: number | null
        }
        Insert: {
          created_at?: string
          experience: string
          id?: string
          location: string
          name: string
          specialization: string
          summary?: string | null
          budget?: number | null
        }
        Update: {
          created_at?: string
          experience?: string
          id?: string
          location?: string
          name?: string
          specialization?: string
          summary?: string | null
          budget?: number | null
        }
        Relationships: []
      }
      government_schemes: {
        Row: {
          benefits: string | null
          created_at: string
          description: string
          eligibility: string | null
          how_to_apply: string | null
          id: string
          image_url: string | null
          summary: string | null
          title: string
        }
        Insert: {
          benefits?: string | null
          created_at?: string
          description: string
          eligibility?: string | null
          how_to_apply?: string | null
          id?: string
          image_url?: string | null
          summary?: string | null
          title: string
        }
        Update: {
          benefits?: string | null
          created_at?: string
          description?: string
          eligibility?: string | null
          how_to_apply?: string | null
          id?: string
          image_url?: string | null
          summary?: string | null
          title?: string
        }
        Relationships: []
      }
      hospitals: {
        Row: {
          created_at: string
          id: string
          location: string
          name: string
          state: string
          summary: string | null
          treatments: string[] | null
          type: string
        }
        Insert: {
          created_at?: string
          id?: string
          location: string
          name: string
          state: string
          summary?: string | null
          treatments?: string[] | null
          type: string
        }
        Update: {
          created_at?: string
          id?: string
          location?: string
          name?: string
          state?: string
          summary?: string | null
          treatments?: string[] | null
          type?: string
        }
        Relationships: []
      }
      medical: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      policies: {
        Row: {
          id: string
          policy_name: string
          insurer: string
          premium: number
          coverage: string
          eligibility: string
          benefits: string
          exclusions: string
          redirect_link: string
          created_at: string
        }
        Insert: {
          id?: string
          policy_name: string
          insurer: string
          premium: number
          coverage: string
          eligibility: string
          benefits: string
          exclusions: string
          redirect_link: string
          created_at?: string
        }
        Update: {
          id?: string
          policy_name?: string
          insurer?: string
          premium?: number
          coverage?: string
          eligibility?: string
          benefits?: string
          exclusions?: string
          redirect_link?: string
          created_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
        }
        Relationships: []
      }
      state_schemes: {
        Row: {
          benefits: string | null
          created_at: string
          description: string
          eligibility: string | null
          how_to_apply: string | null
          id: string
          image_url: string | null
          state: string
          summary: string | null
          title: string
        }
        Insert: {
          benefits?: string | null
          created_at?: string
          description: string
          eligibility?: string | null
          how_to_apply?: string | null
          id?: string
          image_url?: string | null
          state: string
          summary?: string | null
          title: string
        }
        Update: {
          benefits?: string | null
          created_at?: string
          description?: string
          eligibility?: string | null
          how_to_apply?: string | null
          id?: string
          image_url?: string | null
          state?: string
          summary?: string | null
          title?: string
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
