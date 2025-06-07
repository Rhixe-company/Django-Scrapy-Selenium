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
      Artist: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      Author: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      Category: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      Chapter: {
        Row: {
          comic: string
          created_at: string
          id: string
          link: string
          name: string
          numimages: number
          slug: string
          title: string | null
          updated_at: string
        }
        Insert: {
          comic: string
          created_at?: string
          id?: string
          link: string
          name: string
          numimages: number
          slug: string
          title?: string | null
          updated_at: string
        }
        Update: {
          comic?: string
          created_at?: string
          id?: string
          link?: string
          name?: string
          numimages?: number
          slug?: string
          title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "Chapter_comic_fkey"
            columns: ["comic"]
            isOneToOne: false
            referencedRelation: "Comic"
            referencedColumns: ["slug"]
          },
        ]
      }
      ChapterImage: {
        Row: {
          chapter: string
          checksum: string | null
          comic: string
          id: string
          image: string | null
          link: string
          status: string | null
        }
        Insert: {
          chapter: string
          checksum?: string | null
          comic: string
          id?: string
          image?: string | null
          link: string
          status?: string | null
        }
        Update: {
          chapter?: string
          checksum?: string | null
          comic?: string
          id?: string
          image?: string | null
          link?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ChapterImage_chapter_fkey"
            columns: ["chapter"]
            isOneToOne: false
            referencedRelation: "Chapter"
            referencedColumns: ["slug"]
          },
          {
            foreignKeyName: "ChapterImage_comic_fkey"
            columns: ["comic"]
            isOneToOne: false
            referencedRelation: "Comic"
            referencedColumns: ["slug"]
          },
        ]
      }
      Comic: {
        Row: {
          artist: string | null
          author: string | null
          category: string
          created_at: string
          description: string
          genres: string
          id: string
          link: string
          numchapters: number
          numimages: number
          rating: number
          serialization: string | null
          slug: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          artist?: string | null
          author?: string | null
          category: string
          created_at?: string
          description: string
          genres: string
          id?: string
          link: string
          numchapters: number
          numimages: number
          rating: number
          serialization?: string | null
          slug: string
          status: string
          title: string
          updated_at: string
        }
        Update: {
          artist?: string | null
          author?: string | null
          category?: string
          created_at?: string
          description?: string
          genres?: string
          id?: string
          link?: string
          numchapters?: number
          numimages?: number
          rating?: number
          serialization?: string | null
          slug?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "Comic_artist_fkey"
            columns: ["artist"]
            isOneToOne: false
            referencedRelation: "Artist"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "Comic_author_fkey"
            columns: ["author"]
            isOneToOne: false
            referencedRelation: "Author"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "Comic_category_fkey"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "Category"
            referencedColumns: ["name"]
          },
        ]
      }
      ComicImage: {
        Row: {
          checksum: string | null
          comic: string
          id: string
          image: string | null
          link: string
          status: string | null
        }
        Insert: {
          checksum?: string | null
          comic: string
          id?: string
          image?: string | null
          link: string
          status?: string | null
        }
        Update: {
          checksum?: string | null
          comic?: string
          id?: string
          image?: string | null
          link?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ComicImage_comic_fkey"
            columns: ["comic"]
            isOneToOne: false
            referencedRelation: "Comic"
            referencedColumns: ["slug"]
          },
        ]
      }
      Genre: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
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
    Enums: {},
  },
} as const
