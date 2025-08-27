/*
  # Create products table for inventory management

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `category_id` (uuid, foreign key to categories)
      - `name` (text, product name)
      - `slug` (text, URL-friendly identifier)
      - `description` (text, product description)
      - `price` (numeric, product price in ZAR)
      - `compare_price` (numeric, original price for discounts)
      - `stock` (integer, available quantity)
      - `sku` (text, stock keeping unit)
      - `image_url` (text, main product image)
      - `gallery_urls` (text array, additional images)
      - `tags` (text array, searchable tags)
      - `is_featured` (boolean, featured product flag)
      - `is_active` (boolean, visibility flag)
      - `rating` (numeric, average rating)
      - `review_count` (integer, number of reviews)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `products` table
    - Add policy for public read access to active products
    - Add policy for admin write access

  3. Indexes
    - Create indexes for performance optimization
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  price numeric(10,2) NOT NULL CHECK (price >= 0),
  compare_price numeric(10,2) CHECK (compare_price >= price),
  stock integer DEFAULT 0 CHECK (stock >= 0),
  sku text UNIQUE,
  image_url text,
  gallery_urls text[],
  tags text[],
  is_featured boolean DEFAULT false,
  is_active boolean DEFAULT true,
  rating numeric(3,2) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  review_count integer DEFAULT 0 CHECK (review_count >= 0),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Products are viewable by everyone"
  ON products
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Admins can manage products"
  ON products
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.is_admin = true
    )
  );

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_products_rating ON products(rating);
CREATE INDEX IF NOT EXISTS idx_products_tags ON products USING GIN(tags);

-- Trigger for updated_at
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample products
INSERT INTO products (category_id, name, slug, description, price, stock, sku, image_url, tags, is_featured, rating, review_count) VALUES
  (
    (SELECT id FROM categories WHERE slug = 'corporate-clothing'),
    'Premium Corporate Polo Shirt',
    'premium-corporate-polo-shirt',
    'High-quality cotton polo shirt perfect for corporate branding. Available in multiple colors with embroidery options.',
    249.00,
    100,
    'POLO-001',
    'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    ARRAY['polo', 'corporate', 'clothing', 'embroidery'],
    true,
    4.8,
    124
  ),
  (
    (SELECT id FROM categories WHERE slug = 'corporate-gifts'),
    'Executive Gift Set',
    'executive-gift-set',
    'Luxury executive gift set including pen, notebook, and business card holder in premium leather.',
    599.00,
    50,
    'GIFT-001',
    'https://images.pexels.com/photos/6069112/pexels-photo-6069112.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    ARRAY['executive', 'gift', 'leather', 'premium'],
    true,
    4.9,
    89
  ),
  (
    (SELECT id FROM categories WHERE slug = 'workwear'),
    'Safety Workwear Bundle',
    'safety-workwear-bundle',
    'Complete safety workwear package including high-visibility vest, hard hat, and safety boots.',
    1299.00,
    25,
    'SAFETY-001',
    'https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    ARRAY['safety', 'workwear', 'bundle', 'hi-viz'],
    false,
    4.7,
    156
  ),
  (
    (SELECT id FROM categories WHERE slug = 'headwear-accessories'),
    'Custom Branded Cap',
    'custom-branded-cap',
    'Adjustable cap with custom embroidery. Perfect for promotional events and corporate branding.',
    89.00,
    200,
    'CAP-001',
    'https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    ARRAY['cap', 'headwear', 'embroidery', 'promotional'],
    false,
    4.6,
    203
  ),
  (
    (SELECT id FROM categories WHERE slug = 'corporate-clothing'),
    'Corporate Hoodie',
    'corporate-hoodie',
    'Comfortable cotton hoodie with modern fit. Ideal for casual corporate wear and team building events.',
    399.00,
    75,
    'HOODIE-001',
    'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    ARRAY['hoodie', 'corporate', 'casual', 'cotton'],
    false,
    4.5,
    167
  ),
  (
    (SELECT id FROM categories WHERE slug = 'corporate-gifts'),
    'Promotional Tote Bag',
    'promotional-tote-bag',
    'Eco-friendly canvas tote bag perfect for promotional campaigns and corporate events.',
    45.00,
    300,
    'TOTE-001',
    'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    ARRAY['tote', 'bag', 'eco-friendly', 'promotional'],
    false,
    4.4,
    289
  )
ON CONFLICT (slug) DO NOTHING;