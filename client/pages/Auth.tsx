import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  Building,
  ArrowLeft,
  Sparkles,
  Shield,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    company: "",
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { state, login, signup, clearError } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (state.isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [state.isAuthenticated, navigate, from]);

  useEffect(() => {
    if (state.error) {
      toast({
        title: "Authentication Error",
        description: state.error,
        variant: "destructive",
      });
    }
  }, [state.error, toast]);

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    // Email validation
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    // For signup, validate additional fields
    if (!isLogin) {
      if (!formData.firstName.trim()) {
        errors.firstName = "First name is required";
      }
      if (!formData.lastName.trim()) {
        errors.lastName = "Last name is required";
      }
      if (
        formData.phone &&
        !/^[+]?[1-9][\d\s\-()]{7,15}$/.test(formData.phone)
      ) {
        errors.phone = "Please enter a valid phone number";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
      } else {
        await signup(formData);
        toast({
          title: "Account created!",
          description: "Welcome to APEX. You can now start shopping.",
        });
      }
    } catch (error) {
      // Error is handled by useEffect above
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear field error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  const features = [
    {
      icon: Shield,
      title: "Secure Shopping",
      description: "Your data is protected with enterprise-grade security",
    },
    {
      icon: CheckCircle,
      title: "Fast Checkout",
      description: "Save your details for lightning-fast future orders",
    },
    {
      icon: Sparkles,
      title: "Exclusive Deals",
      description: "Get access to member-only discounts and offers",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center relative overflow-hidden">
      {/* Cinematic Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-red/15 via-transparent to-red-600/15" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(220,20,60,0.2),transparent_70%)] animate-float" />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(220,20,60,0.15),transparent_60%)] animate-floatReverse"
        style={{ animationDelay: "1000ms" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,0,0,0.1),transparent_50%)] animate-breathe" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 dot-pattern opacity-20" />

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle animate-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${10 + Math.random() * 8}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-6 sm:py-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
          {/* Left Side - Features */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <Badge className="bg-gradient-to-r from-brand-red to-red-600 text-white font-bold px-4 py-2 rounded-full border-0 shadow-lg">
                <Sparkles className="h-4 w-4 mr-2" />
                Join APEX Today
              </Badge>

              <h1 className="text-4xl md:text-6xl font-black leading-tight">
                <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                  Welcome to
                </span>
                <br />
                <span className="bg-gradient-to-r from-brand-red via-red-500 to-red-600 bg-clip-text text-transparent">
                  APEX
                </span>
              </h1>

              <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                Africa's leading promotional products provider. Join thousands
                of businesses who trust us for their{" "}
                <span className="text-brand-red font-semibold">
                  corporate needs
                </span>
                .
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="bg-gradient-to-br from-brand-red to-red-600 p-3 rounded-xl">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Back to Home */}
            <Link to="/">
              <Button
                variant="outline"
                className="group border-white/30 text-white hover:bg-white/10 hover:border-brand-red/50 font-medium px-6 py-3 rounded-xl backdrop-blur-md transition-all duration-300"
              >
                <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                Back to Shopping
              </Button>
            </Link>
          </div>

          {/* Right Side - Premium Auth Form */}
          <div className="w-full max-w-md mx-auto">
            <Card className="bg-black/50 backdrop-blur-2xl border border-white/30 shadow-2xl shadow-brand-red/10 relative overflow-hidden">
              {/* Card glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-red/10 via-transparent to-red-600/10 opacity-0 hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -inset-1 bg-gradient-to-br from-brand-red/20 to-red-600/20 rounded-2xl blur opacity-30" />
              <CardHeader className="text-center space-y-4">
                <CardTitle className="text-2xl font-bold text-white">
                  {isLogin ? "Welcome Back" : "Create Account"}
                </CardTitle>
                <p className="text-gray-400">
                  {isLogin
                    ? "Sign in to your APEX account"
                    : "Join APEX and start shopping"}
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white font-medium">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-10 h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-brand-red/50 focus:bg-white/20 transition-all duration-300 text-base"
                        placeholder="your.email@company.com"
                        aria-invalid={!!formErrors.email}
                        aria-describedby={
                          formErrors.email ? "email-error" : undefined
                        }
                      />
                      {formErrors.email && (
                        <p
                          id="email-error"
                          className="text-red-400 text-xs mt-1 flex items-center"
                        >
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {formErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="text-white font-medium"
                    >
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                        className="pl-10 pr-10 h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-brand-red/50 focus:bg-white/20 transition-all duration-300 text-base"
                        placeholder="Enter your password"
                        aria-invalid={!!formErrors.password}
                        aria-describedby={
                          formErrors.password ? "password-error" : undefined
                        }
                      />
                      {formErrors.password && (
                        <p
                          id="password-error"
                          className="text-red-400 text-xs mt-1 flex items-center"
                        >
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {formErrors.password}
                        </p>
                      )}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 text-gray-400 hover:text-white"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Signup Fields */}
                  {!isLogin && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="firstName"
                            className="text-white font-medium"
                          >
                            First Name
                          </Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              id="firstName"
                              name="firstName"
                              required
                              value={formData.firstName}
                              onChange={handleInputChange}
                              className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-brand-red/50 focus:bg-white/20 transition-all duration-300"
                              placeholder="John"
                              aria-invalid={!!formErrors.firstName}
                            />
                            {formErrors.firstName && (
                              <p className="text-red-400 text-xs mt-1 flex items-center">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                {formErrors.firstName}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="lastName"
                            className="text-white font-medium"
                          >
                            Last Name
                          </Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            required
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-brand-red/50 focus:bg-white/20 transition-all duration-300"
                            placeholder="Doe"
                            aria-invalid={!!formErrors.lastName}
                          />
                          {formErrors.lastName && (
                            <p className="text-red-400 text-xs mt-1 flex items-center">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              {formErrors.lastName}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="phone"
                          className="text-white font-medium"
                        >
                          Phone Number (Optional)
                        </Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-brand-red/50 focus:bg-white/20 transition-all duration-300"
                            placeholder="+27 11 123 4567"
                            aria-invalid={!!formErrors.phone}
                          />
                          {formErrors.phone && (
                            <p className="text-red-400 text-xs mt-1 flex items-center">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              {formErrors.phone}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="company"
                          className="text-white font-medium"
                        >
                          Company (Optional)
                        </Label>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-brand-red/50 focus:bg-white/20 transition-all duration-300"
                            placeholder="Your Company Ltd"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-brand-red to-red-600 hover:from-red-600 hover:to-brand-red text-white font-bold py-4 rounded-xl shadow-xl mobile-shadow-red transition-all duration-300 hover:scale-105 active:scale-95 touch-manipulation text-base"
                    disabled={state.isLoading || isSubmitting}
                  >
                    {state.isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>
                          {isLogin ? "Signing In..." : "Creating Account..."}
                        </span>
                      </div>
                    ) : (
                      <span>{isLogin ? "Sign In" : "Create Account"}</span>
                    )}
                  </Button>
                </form>

                {/* Toggle Auth Mode */}
                <div className="text-center space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/20" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-black/40 px-4 text-gray-400">or</span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setIsLogin(!isLogin);
                      clearError();
                    }}
                    className="text-white hover:text-brand-red hover:bg-white/5 transition-all duration-300"
                  >
                    {isLogin
                      ? "Don't have an account? Sign up"
                      : "Already have an account? Sign in"}
                  </Button>
                </div>

                {/* Error Display */}
                {state.error && (
                  <div className="flex items-center space-x-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <AlertCircle className="h-4 w-4 text-red-400" />
                    <span className="text-red-400 text-sm">{state.error}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
