import { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { OptimizedImage } from "./OptimizedImage";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Heart,
  Phone,
  Mail,
  ChevronDown,
  LogOut,
  Settings,
  Package,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { state } = useCart();
  const { state: authState, logout } = useAuth();

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    const scrollTop = window.pageYOffset;
    setIsScrolled(scrollTop > 50);
  }, []);

  // Navigation items
  const mainNavItems = useMemo(
    () => [
      {
        name: "Clothing",
        href: "/corporate-gifts",
        badge: "Popular",
        items: [
          "T-Shirts",
          "Golf Shirts",
          "Jackets",
          "Hoodies",
          "Kids Clothing",
          "Tracksuits",
          "Pants & Shoes",
          "Body Warmers",
          "Sweaters",
        ],
      },
      {
        name: "Workwear",
        href: "/corporate-clothing",
        items: [
          "Accessories",
          "Bottoms",
          "Contis",
          "Headwear",
          "HI-VIZ",
          "Hospitality",
          "Rainwear",
          "Security Wear",
          "Tops",
          "Warmwear",
          "Work Jackets & Pants",
        ],
      },
      {
        name: "Headwear",
        href: "/workwear",
        items: [
          "Caps",
          "Beanies",
          "Hats",
          "Gloves",
          "Scarves",
          "Headwear Sets",
        ],
      },
      {
        name: "Safety Gear",
        href: "/headwear-and-accessories",
        items: [
          "Hard Hats",
          "Gloves",
          "Respiratory Protection",
          "Footwear",
          "Safety Class",
          "Safety Vests",
          "Hearing Protection",
          "Barricade Tape",
        ],
      },
      {
        name: "Gifting",
        href: "/gifting",
        items: ["Corporate Gifts", "Executive Sets", "Gift Hampers"],
      },
      {
        name: "Display",
        href: "/display",
        items: ["Banners", "Pop-ups", "Exhibition"],
      },
      {
        name: "Footwear",
        href: "/footwear",
        items: ["Safety Boots", "Corporate Shoes"],
      },
      {
        name: "Custom Products",
        href: "/custom-products",
        badge: "Hot",
        items: ["Laser Engraving", "Embroidery", "Screen Printing"],
      },
    ],
    [],
  );

  // Optimized scroll effect with throttling
  useEffect(() => {
    let ticking = false;

    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, [handleScroll]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (
        !target.closest("[data-dropdown]") &&
        !target.closest("[data-user-menu]")
      ) {
        setActiveDropdown(null);
        setShowUserMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Top Bar */}
      <div className="relative bg-gradient-to-r from-brand-red via-red-500 to-brand-red text-white py-3 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-lg"></div>
        <div className="container mx-auto flex justify-between items-center text-sm relative z-10">
          <div className="flex items-center space-x-4">
            <a
              href="tel:+27760355295"
              className="flex items-center space-x-2 group cursor-pointer hover:scale-105 transition-transform duration-300 touch-manipulation"
            >
              <div className="p-2 rounded-xl bg-white/20 group-hover:bg-white/30 transition-all duration-300">
                <Phone className="h-4 w-4" />
              </div>
              <span className="font-bold group-hover:text-yellow-300 transition-colors duration-300">
                +27 76 035 5295
              </span>
            </a>
            <a
              href="mailto:apex@w-o-s.co.za"
              className="hidden sm:flex items-center space-x-2 group cursor-pointer hover:scale-105 transition-transform duration-300 touch-manipulation"
            >
              <div className="p-2 rounded-xl bg-white/20 group-hover:bg-white/30 transition-all duration-300">
                <Mail className="h-4 w-4" />
              </div>
              <span className="group-hover:text-yellow-300 transition-colors duration-300">
                apex@w-o-s.co.za
              </span>
            </a>
          </div>

          <div className="flex items-center">
            {/* Track Order functionality removed */}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-black/98 backdrop-blur-3xl border-b border-white/30 shadow-2xl shadow-brand-red/20"
            : "bg-black/85 backdrop-blur-2xl border-b border-white/15"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-brand-red/8 via-transparent to-red-600/8"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F5ed541bb7f2f4c82a9c16c7e0b0da0c6%2F9bb429a85e0b4d2d88ed91995554ee98"
                alt="APEX Logo"
                className="h-12 w-auto object-contain"
              />
            </Link>

            {/* Desktop Search */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full group">
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-red/30 to-red-600/30 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-full pl-6 pr-14 py-3 bg-white/12 backdrop-blur-lg border-white/25 rounded-xl text-white placeholder-white/70 focus:bg-white/20 focus:border-brand-red/60 transition-all duration-300 text-lg"
                  />
                  <Button
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-brand-red to-red-600 hover:from-red-600 hover:to-brand-red rounded-lg px-4 py-2 shadow-lg hover:shadow-red-500/30 transition-all duration-300"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              {authState.isAuthenticated ? (
                <div className="relative" data-user-menu>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="text-white hover:bg-white/10 hover:text-brand-red transition-all duration-300 rounded-xl px-4 py-2 font-medium"
                  >
                    <User className="h-5 w-5 mr-2" />
                    {authState.user?.firstName || "Account"}
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>

                  {showUserMenu && (
                    <div className="absolute top-full right-0 mt-2 w-64 bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-50">
                      <div className="p-4 border-b border-white/10">
                        <div className="text-white font-medium">
                          {authState.user?.firstName} {authState.user?.lastName}
                        </div>
                        <div className="text-gray-400 text-sm">
                          {authState.user?.email}
                        </div>
                      </div>
                      <div className="p-2">
                        <Link
                          to="/profile"
                          className="flex items-center w-full px-4 py-3 text-white/80 hover:text-brand-red hover:bg-white/5 rounded-xl transition-all duration-200"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <Settings className="h-4 w-4 mr-3" />
                          Profile Settings
                        </Link>
                        <Link
                          to="/orders"
                          className="flex items-center w-full px-4 py-3 text-white/80 hover:text-brand-red hover:bg-white/5 rounded-xl transition-all duration-200"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <Package className="h-4 w-4 mr-3" />
                          My Orders
                        </Link>
                        <button
                          onClick={() => {
                            logout();
                            setShowUserMenu(false);
                          }}
                          className="flex items-center w-full px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all duration-200"
                        >
                          <LogOut className="h-4 w-4 mr-3" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/auth">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/10 hover:text-brand-red transition-all duration-300 rounded-xl px-4 py-2 font-medium"
                  >
                    <User className="h-5 w-5 mr-2" />
                    Sign In
                  </Button>
                </Link>
              )}

              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10 hover:text-brand-red transition-all duration-300 rounded-xl px-4 py-2 font-medium"
              >
                <Heart className="h-5 w-5 mr-2" />
                Wishlist
              </Button>

              <Link to="/cart">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10 hover:text-brand-red transition-all duration-300 rounded-xl px-4 py-2 font-medium relative group"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Cart
                  {state.itemCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-brand-red to-red-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center border-2 border-black group-hover:scale-110 transition-transform duration-200 font-bold">
                      {state.itemCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* Admin Login Button */}
              <Link to="/admin-login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10 hover:text-brand-red transition-all duration-300 rounded-xl p-2 font-medium"
                  title="Admin Login"
                >
                  <Settings className="h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center space-x-2">
              <Link to="/cart">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10 hover:text-brand-red transition-all duration-300 rounded-xl min-w-[48px] min-h-[48px] p-3 relative group touch-manipulation active:bg-white/20"
                  aria-label={`Shopping cart ${state.itemCount > 0 ? `with ${state.itemCount} items` : 'empty'}`}
                >
                  <ShoppingCart className="h-6 w-6" />
                  {state.itemCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 bg-gradient-to-r from-brand-red to-red-600 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center border-2 border-black font-bold px-1">
                      {state.itemCount > 99 ? '99+' : state.itemCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10 rounded-xl min-w-[48px] min-h-[48px] p-3 transition-all duration-300 touch-manipulation active:scale-95 active:bg-white/20"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
              >
                <div className="relative w-6 h-6">
                  <Menu
                    className={`h-6 w-6 absolute transition-all duration-300 ${
                      isMobileMenuOpen
                        ? "rotate-90 opacity-0"
                        : "rotate-0 opacity-100"
                    }`}
                  />
                  <X
                    className={`h-6 w-6 absolute transition-all duration-300 ${
                      isMobileMenuOpen
                        ? "rotate-0 opacity-100"
                        : "-rotate-90 opacity-0"
                    }`}
                  />
                </div>
              </Button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block border-t border-white/10 backdrop-blur-sm">
            <div className="flex items-center justify-center space-x-8 py-4">
              {mainNavItems.map((item) => (
                <div
                  key={item.name}
                  className="relative group"
                  data-dropdown
                  onMouseEnter={() => setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={item.href}
                    className="flex items-center space-x-2 text-white/90 hover:text-brand-red font-medium whitespace-nowrap transition-all duration-300 py-2 px-4 rounded-xl hover:bg-white/5 group-hover:scale-105"
                  >
                    <span>{item.name}</span>
                    {item.badge && (
                      <Badge
                        className={`text-xs ${
                          item.badge === "New"
                            ? "bg-green-500"
                            : item.badge === "Hot"
                              ? "bg-orange-500"
                              : "bg-brand-red"
                        } text-white border-0`}
                      >
                        {item.badge}
                      </Badge>
                    )}
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                  </Link>

                  {item.items && activeDropdown === item.name && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-50">
                      <div className="p-4 space-y-2">
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem}
                            to={`${item.href}?category=${subItem.toLowerCase().replace(" ", "-")}`}
                            className="block px-4 py-3 text-white/80 hover:text-brand-red hover:bg-white/5 rounded-xl transition-all duration-200 font-medium"
                          >
                            {subItem}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-lg"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Menu Panel */}
          <div
            className="absolute right-0 top-0 h-full w-full max-w-sm bg-black/95 backdrop-blur-xl border-l border-white/20 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <div className="p-6 space-y-6">
              {/* Mobile Search */}
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full pl-4 pr-12 py-4 bg-white/10 backdrop-blur-md border-white/20 rounded-xl text-white placeholder-white/60 focus:bg-white/20 focus:border-brand-red/50 transition-all duration-300"
                />
                <Button
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-brand-red to-red-600 rounded-lg px-3 py-2"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>

              {/* Mobile User Section */}
              {authState.isAuthenticated ? (
                <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <div className="text-white font-bold text-lg mb-2">
                    {authState.user?.firstName} {authState.user?.lastName}
                  </div>
                  <div className="text-gray-300 text-sm mb-4">
                    {authState.user?.email}
                  </div>
                  <div className="space-y-2">
                    <Link
                      to="/profile"
                      className="flex items-center w-full px-4 py-3 text-white hover:text-brand-red hover:bg-white/10 rounded-lg transition-all duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Settings className="h-4 w-4 mr-3" />
                      Profile Settings
                    </Link>
                    <Link
                      to="/orders"
                      className="flex items-center w-full px-4 py-3 text-white hover:text-brand-red hover:bg-white/10 rounded-lg transition-all duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Package className="h-4 w-4 mr-3" />
                      My Orders
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block"
                >
                  <Button className="w-full bg-gradient-to-r from-brand-red to-red-600 hover:from-red-600 hover:to-brand-red text-white font-bold py-4 rounded-xl">
                    <User className="h-5 w-5 mr-2" />
                    Sign In / Register
                  </Button>
                </Link>
              )}

              {/* Mobile Quick Actions */}
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="ghost"
                  className="flex flex-col items-center space-y-2 text-white hover:bg-white/10 hover:text-brand-red rounded-xl p-4 h-auto min-h-[80px] touch-manipulation active:bg-white/20"
                  aria-label="Wishlist"
                >
                  <Heart className="h-6 w-6" />
                  <span className="text-sm font-medium">Wishlist</span>
                </Button>

                <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full flex flex-col items-center space-y-2 text-white hover:bg-white/10 hover:text-brand-red rounded-xl p-4 h-auto min-h-[80px] relative touch-manipulation active:bg-white/20"
                    aria-label={`Go to cart ${state.itemCount > 0 ? `with ${state.itemCount} items` : ''}`}
                  >
                    <ShoppingCart className="h-6 w-6" />
                    <span className="text-sm font-medium">Cart</span>
                    {state.itemCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 bg-gradient-to-r from-brand-red to-red-600 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center font-bold px-1">
                        {state.itemCount > 99 ? '99+' : state.itemCount}
                      </Badge>
                    )}
                  </Button>
                </Link>
              </div>

              {/* Mobile Navigation */}
              <nav className="space-y-2">
                {mainNavItems.map((item) => (
                  <div
                    key={item.name}
                    className="bg-white/5 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden"
                  >
                    <Link
                      to={item.href}
                      className="flex items-center justify-between w-full p-4 text-white hover:text-brand-red hover:bg-white/10 transition-all duration-300 font-bold min-h-[56px] touch-manipulation active:bg-white/20"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="flex items-center space-x-3">
                        <span>{item.name}</span>
                        {item.badge && (
                          <Badge
                            className={`text-xs px-2 py-1 ${
                              item.badge === "New"
                                ? "bg-green-500"
                                : item.badge === "Hot"
                                  ? "bg-orange-500"
                                  : "bg-brand-red"
                            } text-white border-0 rounded-full font-bold`}
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                      <ChevronDown className="h-5 w-5" />
                    </Link>

                    {item.items && (
                      <div className="bg-black/20 px-4 pb-4">
                        <div className="space-y-1">
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem}
                              to={`${item.href}?category=${subItem.toLowerCase().replace(" ", "-")}`}
                              className="block p-3 text-white/80 hover:text-brand-red hover:bg-white/10 rounded-lg transition-all duration-200 font-medium min-h-[48px] touch-manipulation active:bg-white/20 flex items-center"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {subItem}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              {/* Mobile Contact */}
              <div className="bg-gradient-to-br from-brand-red/20 to-red-600/20 backdrop-blur-md rounded-xl p-4 border border-brand-red/30">
                <h3 className="text-white font-bold text-lg mb-3 text-center">
                  Need Help?
                </h3>
                <div className="space-y-3">
                  <a
                    href="tel:+27760355295"
                    className="flex items-center space-x-3 text-white hover:text-yellow-300 transition-colors duration-300 p-4 rounded-lg hover:bg-white/10 min-h-[56px] touch-manipulation active:bg-white/20"
                    aria-label="Call us at +27 76 035 5295"
                  >
                    <Phone className="h-5 w-5" />
                    <span className="font-bold">+27 76 035 5295</span>
                  </a>
                  <a
                    href="mailto:apex@w-o-s.co.za"
                    className="flex items-center space-x-3 text-white hover:text-yellow-300 transition-colors duration-300 p-4 rounded-lg hover:bg-white/10 min-h-[56px] touch-manipulation active:bg-white/20"
                    aria-label="Email us at apex@w-o-s.co.za"
                  >
                    <Mail className="h-5 w-5" />
                    <span className="font-bold">apex@w-o-s.co.za</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
