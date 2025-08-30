import { useState, useEffect } from 'react';
import { supabase, dbHelpers } from '@/lib/supabase';
import type { Database } from '@/lib/supabase';

type Product = Database['public']['Tables']['products']['Row'];
type Category = Database['public']['Tables']['categories']['Row'];

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [productsData, categoriesData] = await Promise.all([
        dbHelpers.getFeaturedProducts(12),
        dbHelpers.getCategories()
      ]);

      setProducts(productsData || []);
      setCategories(categoriesData || []);
    } catch (err) {
      console.error('Error loading products:', err);
      setError('Failed to load products');
      // Set fallback data
      setCategories([
        {
          id: '1',
          name: 'Corporate Gifts',
          slug: 'corporate-gifts',
          description: 'Premium branded items for your business',
          image_url: 'https://images.pexels.com/photos/6069112/pexels-photo-6069112.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
          sort_order: 1,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Corporate Clothing',
          slug: 'corporate-clothing',
          description: 'Professional apparel for your team',
          image_url: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
          sort_order: 2,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '3',
          name: 'Workwear',
          slug: 'workwear',
          description: 'Durable clothing for every industry',
          image_url: 'https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
          sort_order: 3,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getProductsByCategory = async (categorySlug: string) => {
    try {
      const data = await dbHelpers.getProductsByCategory(categorySlug);
      return data || [];
    } catch (err) {
      console.error('Error loading category products:', err);
      return [];
    }
  };

  const searchProducts = async (query: string) => {
    try {
      const data = await dbHelpers.searchProducts(query);
      return data || [];
    } catch (err) {
      console.error('Error searching products:', err);
      return [];
    }
  };

  return {
    products,
    categories,
    loading,
    error,
    refetch: loadData,
    getProductsByCategory,
    searchProducts
  };
}