import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { OptimizedImage } from "@/components/OptimizedImage";
import { SEO, generateFAQSchema } from "@/components/SEO";
import { useProducts } from "@/hooks/use-products";
import {
  ArrowRight,
  Star,
  Truck,
  Shield,
  Award,
  Users,
  Gift,
  Shirt,
  Briefcase,
  Sparkles,
  Zap,
  TrendingUp,
  Rocket,
  CheckCircle,
  Globe,
  Heart,
  Target,
  Flame,
  Download,
  Eye,
  ShoppingBag,
  BookOpen,
  MousePointer,
  Play,
  Coffee,
  Crown,
  Layers,
  ChevronLeft,
  ChevronRight,
  Pause,
} from "lucide-react";

export default function Index() {
  const { categories, loading } = useProducts();

  // SEO structured data for FAQ
  const faqData = [
    {
      question: "What types of promotional products does APEX offer?",
      answer:
        "APEX offers over 10,000+ promotional products including corporate gifts, workwear, headwear, safety gear, custom clothing, and branded accessories with professional embroidery and printing services.",
    },
    {
      question: "Do you provide custom branding services?",
      answer:
        "Yes, we provide professional custom branding services including embroidery, screen printing, laser engraving, and digital printing on all our promotional products.",
    },
    {
      question: "What is your delivery time across South Africa?",
      answer:
        "We offer fast delivery across South Africa with turnaround times typically ranging from 48 hours to 7 working days depending on the product and customization requirements.",
    },
    {
      question: "Do you offer bulk discounts for large orders?",
      answer:
        "Yes, we offer competitive bulk pricing for large orders. Contact our sales team at +27 76 035 5295 or apex@w-o-s.co.za for custom quotes on bulk orders.",
    },
  ];

  const featuredCategories = categories.slice(0, 6).map(cat => ({
    title: cat.name,
    description: cat.description || `Premium ${cat.name.toLowerCase()} products`,
    image: cat.image_url || "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    href: `/${cat.slug}`,
    id: cat.slug,
    count: 100 // This would come from a product count query in a real app
  }));

  // Marketing slideshow banners
  const marketingSlides = [
    {
      id: 1,
      title: "Gear Up, Stand Out",
      subtitle: "Spring Fashion Collection",
      description:
        "Embrace the lively spirit of spring with our newest fashion collection, featuring vibrant colors and elegance",
      backgroundImage:
        "https://images.pexels.com/photos/5698857/pexels-photo-5698857.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
      cta: "Shop Collection",
      link: "/corporate-gifts",
    },
    {
      id: 2,
      title: "Professional Excellence",
      subtitle: "APEX Collection",
      description:
        "Discover our premium range of professional workwear and corporate solutions designed for modern businesses",
      backgroundImage:
        "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
      cta: "Explore APEX",
      link: "/corporate-clothing",
    },
    {
      id: 3,
      title: "W.O.S APEX",
      subtitle: "Complete Solutions",
      description:
        "From workwear to safety equipment, discover our comprehensive range of professional products and services",
      backgroundImage:
        "https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
      cta: "View All Products",
      link: "/custom-products",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-brand-red/30 border-t-brand-red rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading APEX products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SEO
        title="APEX - Africa's #1 Promotional Products Provider | Corporate Gifts, Workwear & Custom Branding"
        description="Premium corporate gifts, workwear, headwear & promotional items. 10,000+ products with professional custom branding, embroidery & printing services. Fast delivery across South Africa."
        keywords="corporate gifts, promotional products, workwear, custom branding, embroidery, printing, promotional items, corporate clothing, headwear, safety gear, South Africa, APEX, branded merchandise"
        structuredData={generateFAQSchema(faqData)}
      />

      {/* Marketing Slideshow Hero Section */}
      <HeroSlideshow slides={marketingSlides} />

      {/* About Section */}
      <section
        id="about-section"
        className="py-16 sm:py-20 lg:py-32 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,20,60,0.1),transparent_70%)]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* About Content */}
            <div className="space-y-8 animate-fadeInLeft">
              <div className="space-y-4">
                <Badge className="bg-gradient-to-r from-brand-red/20 to-red-600/20 text-brand-red border border-brand-red/30 font-bold px-4 py-2 rounded-full">
                  <Heart className="h-4 w-4 mr-2" />
                  About APEX
                </Badge>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                  Welcome to
                  <span className="gradient-text"> W.O.S APEX</span>
                </h2>
              </div>

              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                At W.O.S APEX we believe your clothing should work as hard as
                you do, and look good doing it. W.O.S APEX is your one-stop
                online destination for premium clothing, durable workwear and
                curated gifting. Driven by W.O.S, W.O.S APEX stands at the
                intersection of function and flare.
              </p>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mt-4">
                Welcome to W.O.S APEX
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 mobile-glass">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-brand-red to-red-600 shadow-lg">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">
                      Quality First
                    </h3>
                    <p className="text-gray-400">
                      Premium materials and craftsmanship in every product
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 mobile-glass">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 shadow-lg">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">
                      Expert Team
                    </h3>
                    <p className="text-gray-400">
                      Professional designers and branding specialists
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 mobile-glass">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 shadow-lg">
                    <Truck className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">
                      Fast Service
                    </h3>
                    <p className="text-gray-400">
                      Quick turnaround times nationwide
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 mobile-glass">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 shadow-lg">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">Guaranteed</h3>
                    <p className="text-gray-400">
                      100% satisfaction guarantee on all orders
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* About Visual */}
            <div className="relative animate-fadeInRight">
              <div className="absolute -inset-4 bg-gradient-to-r from-brand-red/30 to-red-600/30 rounded-3xl blur-2xl opacity-60 animate-pulse" />
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 mobile-glass">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-green-600/20 border border-green-500/30">
                    <div className="text-3xl md:text-4xl font-black text-white">
                      10K+
                    </div>
                    <div className="text-gray-300 font-semibold">Products</div>
                  </div>
                  <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-blue-500/20 to-cyan-600/20 border border-blue-500/30">
                    <div className="text-3xl md:text-4xl font-black text-white">
                      1000+
                    </div>
                    <div className="text-gray-300 font-semibold">Clients</div>
                  </div>
                  <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-600/20 border border-purple-500/30">
                    <div className="text-3xl md:text-4xl font-black text-white">
                      24/7
                    </div>
                    <div className="text-gray-300 font-semibold">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalogue Section */}
      <section
        id="catalogue-section"
        className="py-16 sm:py-20 lg:py-32 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-900" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,20,60,0.15),transparent_70%)]" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center space-y-6 mb-16 animate-fadeInUp">
            <Badge className="bg-gradient-to-r from-brand-red/20 to-red-600/20 text-brand-red border border-brand-red/30 font-bold px-4 py-2 rounded-full">
              <BookOpen className="h-4 w-4 mr-2" />
              Our Catalogue
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
              Explore Our
              <span className="gradient-text"> Premium</span>
              <br />
              Collections
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover thousands of premium promotional products, corporate
              gifts, and custom branding solutions designed to elevate your
              business presence.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {featuredCategories.map((category, index) => (
              <Link
                key={category.id}
                to={category.href}
                className="group animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 hover:border-brand-red/50 transition-all duration-500 hover:scale-105 mobile-card overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative h-48 md:h-56 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                      <OptimizedImage
                        src={category.image}
                        alt={category.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        width={400}
                        height={300}
                        quality={90}
                      />

                      {/* Floating Icon */}
                      <div className="absolute top-4 right-4 z-20 p-3 rounded-xl bg-gradient-to-r from-brand-red to-red-600 shadow-xl group-hover:scale-110 transition-transform duration-300">
                        {category.title.includes("Gift") ? (
                          <Gift className="h-6 w-6 text-white" />
                        ) : category.title.includes("Clothing") ? (
                          <Shirt className="h-6 w-6 text-white" />
                        ) : (
                          <Briefcase className="h-6 w-6 text-white" />
                        )}
                      </div>

                      {/* Product Count Badge */}
                      <div className="absolute top-4 left-4 z-20">
                        <Badge className="bg-black/50 backdrop-blur-lg text-white border-0 font-bold px-3 py-1">
                          <Layers className="h-3 w-3 mr-1" />
                          {category.count}+ Products
                        </Badge>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-brand-red transition-colors duration-300">
                          {category.title}
                        </h3>
                        <p className="text-gray-400 leading-relaxed">
                          {category.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4">
                        <div className="flex items-center gap-2 text-gray-400">
                          <Eye className="h-4 w-4" />
                          <span className="text-sm font-medium">
                            View Collection
                          </span>
                        </div>
                        <ArrowRight className="h-5 w-5 text-brand-red group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Download Catalogues Section */}
          <div className="text-center space-y-8 animate-fadeInUp">
            <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-gradient-to-r from-brand-red/20 to-red-600/20 backdrop-blur-xl border border-red-500/30 mobile-glass">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Browse Our Catalogues
              </h3>
              <p className="text-gray-300 mb-6">
                Download our comprehensive product catalogues to explore our
                full range of offerings.
              </p>
              <div className="relative inline-block">
                <select className="appearance-none bg-gradient-to-r from-brand-red to-red-600 hover:from-red-600 hover:to-brand-red text-white font-bold px-8 py-4 pr-12 rounded-xl shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border-0 outline-none">
                  <option value="">Download Catalogue</option>
                  <option value="corporate-gifts">
                    Corporate Gifts Catalogue
                  </option>
                  <option value="clothing">Clothing Catalogue</option>
                  <option value="workwear">Workwear Catalogue</option>
                  <option value="headwear">
                    Headwear & Accessories Catalogue
                  </option>
                  <option value="safety">Safety Equipment Catalogue</option>
                  <option value="custom">Custom Branding Solutions</option>
                </select>
                <Download className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
