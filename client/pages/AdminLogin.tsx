import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Shield,
  Lock,
  Mail,
  Eye,
  EyeOff,
  Settings,
  Crown,
} from "lucide-react";
import { useState } from "react";

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Add the custom login form handler
    const handleLogin = async (e: Event) => {
      e.preventDefault();

      const email = (document.querySelector("#email") as HTMLInputElement)
        ?.value;
      const password = (document.querySelector("#password") as HTMLInputElement)
        ?.value;

      if (!email || !password) {
        alert("Please fill in all fields");
        return;
      }

      try {
        // @ts-ignore - window.supabase is available globally
        const { data, error } = await window.supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          alert("Login failed: " + error.message);
        } else {
          alert("Login successful!");
          window.location.href = "/admin-dashboard"; // Redirect to admin dashboard
        }
      } catch (err) {
        alert("Login error: " + (err as Error).message);
      }
    };

    const form = document.querySelector("#loginForm");
    if (form) {
      form.addEventListener("submit", handleLogin);
    }

    // Cleanup
    return () => {
      if (form) {
        form.removeEventListener("submit", handleLogin);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
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
        {[...Array(12)].map((_, i) => (
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

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-md mx-auto">
          {/* Back to Home */}
          <div className="mb-8 text-center">
            <Link to="/">
              <Button
                variant="outline"
                className="group border-white/30 text-white hover:bg-white/10 hover:border-brand-red/50 font-medium px-6 py-3 rounded-xl backdrop-blur-md transition-all duration-300"
              >
                <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                Back to Home
              </Button>
            </Link>
          </div>

          {/* Admin Login Card */}
          <Card className="bg-black/50 backdrop-blur-2xl border border-white/30 shadow-2xl shadow-brand-red/10 relative overflow-hidden">
            {/* Card glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-red/10 via-transparent to-red-600/10 opacity-0 hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -inset-1 bg-gradient-to-br from-brand-red/20 to-red-600/20 rounded-2xl blur opacity-30" />

            <CardHeader className="text-center space-y-4 relative z-10">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-brand-red to-red-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <Crown className="h-8 w-8 text-white" />
              </div>

              <Badge className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 border border-yellow-500/30 font-bold px-4 py-2 rounded-full">
                <Shield className="h-4 w-4 mr-2" />
                Admin Access
              </Badge>

              <CardTitle className="text-2xl font-bold text-white">
                Administrator Login
              </CardTitle>
              <p className="text-gray-400">
                Secure access to the admin dashboard
              </p>
            </CardHeader>

            <CardContent className="space-y-6 relative z-10">
              <form id="loginForm" className="space-y-4">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white font-medium">
                    Admin Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="pl-10 h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-brand-red/50 focus:bg-white/20 transition-all duration-300 text-base"
                      placeholder="admin@apex.com"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      className="pl-10 pr-10 h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-brand-red/50 focus:bg-white/20 transition-all duration-300 text-base"
                      placeholder="Enter admin password"
                    />
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

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-brand-red to-red-600 hover:from-red-600 hover:to-brand-red text-white font-bold py-4 rounded-xl shadow-xl mobile-shadow-red transition-all duration-300 hover:scale-105 active:scale-95 touch-manipulation text-base"
                >
                  <Settings className="mr-2 h-5 w-5" />
                  Access Admin Dashboard
                </Button>
              </form>

              {/* Security Notice */}
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Security Notice:</strong> This is a protected admin
                    area. All login attempts are monitored and logged for
                    security purposes.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
