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