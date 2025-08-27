/*
  # Create categories table for product organization

  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text, category name, unique)
      - `slug` (text, URL-friendly identifier)
      - `description` (text, category description)
      - `image_url` (text, category image)
      - `sort_order` (integer, display order)
      - `is_active` (boolean, visibility flag)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `categories` table
    - Add policy for public read access
    - Add policy for admin write access

  3. Initial Data
    - Insert default categories for APEX products
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  image_url text,
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Categories are viewable by everyone"
  ON categories
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Admins can manage categories"
  ON categories
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.is_admin = true
    )
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for updated_at
CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default categories
INSERT INTO categories (name, slug, description, image_url, sort_order) VALUES
  ('Corporate Gifts', 'corporate-gifts', 'Premium branded items for your business', 'https://images.pexels.com/photos/6069112/pexels-photo-6069112.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', 1),
  ('Corporate Clothing', 'corporate-clothing', 'Professional apparel for your team', 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', 2),
  ('Workwear', 'workwear', 'Durable clothing for every industry', 'https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', 3),
  ('Headwear & Accessories', 'headwear-accessories', 'Caps, hats, and promotional accessories', 'https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', 4),
  ('Safety Gear', 'safety-gear', 'Professional safety equipment and gear', 'https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', 5),
  ('Custom Products', 'custom-products', 'Personalized items with custom branding', 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', 6)
ON CONFLICT (slug) DO NOTHING;