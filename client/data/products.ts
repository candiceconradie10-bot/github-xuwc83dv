import { Product } from "@/contexts/CartContext";

// Legacy product data for fallback - will be replaced by Supabase data
export const products: Product[] = [
  {
    id: 1,
    name: "Premium Corporate Polo Shirt",
    price: 249,
    image: "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    category: "corporate-clothing",
    description:
      "High-quality cotton polo shirt perfect for corporate branding. Available in multiple colors with embroidery options.",
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: "Executive Gift Set",
    price: 599,
    image: "https://images.pexels.com/photos/6069112/pexels-photo-6069112.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    category: "corporate-gifts",
    description:
      "Luxury executive gift set including pen, notebook, and business card holder in premium leather.",
    rating: 4.9,
    reviews: 89,
  },
  {
    id: 3,
    name: "Safety Workwear Bundle",
    price: 1299,
    image: "https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    category: "workwear",
    description:
      "Complete safety workwear package including high-visibility vest, hard hat, and safety boots.",
    rating: 4.7,
    reviews: 156,
  },
  {
    id: 4,
    name: "Custom Branded Cap",
    price: 89,
    image: "https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    category: "headwear-and-accessories",
    description:
      "Adjustable cap with custom embroidery. Perfect for promotional events and corporate branding.",
    rating: 4.6,
    reviews: 203,
  },
];

export const categories = [
  {
    title: "Corporate Gifts",
    description: "Premium branded items for your business",
    image: "https://images.pexels.com/photos/6069112/pexels-photo-6069112.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    href: "/gifting",
    id: "corporate-gifts",
    count: 150,
  },
  {
    title: "Clothing",
    description: "Professional apparel for your team",
    image: "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    href: "/corporate-clothing",
    id: "clothing",
    count: 200,
  },
  {
    title: "Workwear",
    description: "Durable clothing for every industry",
    image: "https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    href: "/workwear",
    id: "workwear",
    count: 180,
  },
  {
    title: "Headwear & Accessories",
    description: "Caps, hats, and promotional accessories",
    image: "https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    href: "/headwear",
    id: "headwear",
    count: 120,
  },
];

// Helper functions - these will be replaced by Supabase hooks
export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((product) => product.category === category);
};

export const getProductById = (id: number): Product | undefined => {
  return products.find((product) => product.id === id);
};

export const getFeaturedProducts = (limit: number = 4): Product[] => {
  return products.slice(0, limit);
};