import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string | null;
          is_admin: boolean | null;
          created_at: string | null;
        };
        Insert: {
          id: string;
          display_name?: string | null;
          is_admin?: boolean | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          display_name?: string | null;
          is_admin?: boolean | null;
          created_at?: string | null;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
        };
        Insert: {
          id?: string;
          name: string;
        };
        Update: {
          id?: string;
          name?: string;
        };
      };
      products: {
        Row: {
          id: string;
          category_id: string | null;
          subcategory_id: string | null;
          name: string;
          description: string | null;
          price: number;
          stock: number | null;
          image_url: string | null;
        };
        Insert: {
          id?: string;
          category_id?: string | null;
          subcategory_id?: string | null;
          name: string;
          description?: string | null;
          price: number;
          stock?: number | null;
          image_url?: string | null;
        };
        Update: {
          id?: string;
          category_id?: string | null;
          subcategory_id?: string | null;
          name?: string;
          description?: string | null;
          price?: number;
          stock?: number | null;
          image_url?: string | null;
        };
      };
    };
  };
}