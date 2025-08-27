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
          slug: string;
          description: string | null;
          image_url: string | null;
          sort_order: number | null;
          is_active: boolean | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          image_url?: string | null;
          sort_order?: number | null;
          is_active?: boolean | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          image_url?: string | null;
          sort_order?: number | null;
          is_active?: boolean | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      products: {
        Row: {
          id: string;
          category_id: string | null;
          name: string;
          slug: string;
          description: string | null;
          price: number;
          compare_price: number | null;
          stock: number | null;
          sku: string | null;
          image_url: string | null;
          gallery_urls: string[] | null;
          tags: string[] | null;
          is_featured: boolean | null;
          is_active: boolean | null;
          rating: number | null;
          review_count: number | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          category_id?: string | null;
          name: string;
          slug: string;
          description?: string | null;
          price: number;
          compare_price?: number | null;
          stock?: number | null;
          sku?: string | null;
          image_url?: string | null;
          gallery_urls?: string[] | null;
          tags?: string[] | null;
          is_featured?: boolean | null;
          is_active?: boolean | null;
          rating?: number | null;
          review_count?: number | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          category_id?: string | null;
          name?: string;
          slug?: string;
          description?: string | null;
          price?: number;
          compare_price?: number | null;
          stock?: number | null;
          sku?: string | null;
          image_url?: string | null;
          gallery_urls?: string[] | null;
          tags?: string[] | null;
          is_featured?: boolean | null;
          is_active?: boolean | null;
          rating?: number | null;
          review_count?: number | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string | null;
          order_number: string;
          status: string | null;
          total_amount: number;
          subtotal: number;
          tax_amount: number | null;
          shipping_amount: number | null;
          customer_info: any;
          shipping_address: any;
          billing_address: any | null;
          payment_method: string | null;
          payment_status: string | null;
          notes: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          order_number: string;
          status?: string | null;
          total_amount: number;
          subtotal: number;
          tax_amount?: number | null;
          shipping_amount?: number | null;
          customer_info: any;
          shipping_address: any;
          billing_address?: any | null;
          payment_method?: string | null;
          payment_status?: string | null;
          notes?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          order_number?: string;
          status?: string | null;
          total_amount?: number;
          subtotal?: number;
          tax_amount?: number | null;
          shipping_amount?: number | null;
          customer_info?: any;
          shipping_address?: any;
          billing_address?: any | null;
          payment_method?: string | null;
          payment_status?: string | null;
          notes?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string | null;
          quantity: number;
          unit_price: number;
          total_price: number;
          product_snapshot: any;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id?: string | null;
          quantity: number;
          unit_price: number;
          total_price: number;
          product_snapshot: any;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string | null;
          quantity?: number;
          unit_price?: number;
          total_price?: number;
          product_snapshot?: any;
        };
      };
    };
  };
}

// Helper functions for database operations
export const dbHelpers = {
  // Get all active categories
  async getCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order');
    
    if (error) throw error;
    return data;
  },

  // Get products by category
  async getProductsByCategory(categorySlug: string) {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories!inner(slug)
      `)
      .eq('categories.slug', categorySlug)
      .eq('is_active', true)
      .order('name');
    
    if (error) throw error;
    return data;
  },

  // Get featured products
  async getFeaturedProducts(limit: number = 6) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_featured', true)
      .eq('is_active', true)
      .order('rating', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data;
  },

  // Search products
  async searchProducts(query: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .or(`name.ilike.%${query}%,description.ilike.%${query}%,tags.cs.{${query}}`)
      .order('rating', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Create order
  async createOrder(orderData: any) {
    const { data, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Create order items
  async createOrderItems(orderItems: any[]) {
    const { data, error } = await supabase
      .from('order_items')
      .insert(orderItems)
      .select();
    
    if (error) throw error;
    return data;
  },

  // Get user orders
  async getUserOrders(userId: string) {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items(*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }
};