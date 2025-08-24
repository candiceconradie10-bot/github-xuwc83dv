import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import { supabase } from "@/lib/supabase";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  company?: string;
  addresses?: Address[];
}

export interface Address {
  id: string;
  type: "shipping" | "billing";
  address: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: "AUTH_START" }
  | { type: "AUTH_SUCCESS"; payload: User }
  | { type: "AUTH_ERROR"; payload: string }
  | { type: "LOGOUT" }
  | { type: "UPDATE_USER"; payload: Partial<User> }
  | { type: "CLEAR_ERROR" };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, isLoading: true, error: null };

    case "AUTH_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case "AUTH_ERROR":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };

    case "UPDATE_USER":
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };

    case "CLEAR_ERROR":
      return { ...state, error: null };

    default:
      return state;
  }
};

interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  clearError: () => void;
}

interface SignupData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  company?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for stored auth token on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("apex_user");
    const storedToken = localStorage.getItem("apex_token");

    if (storedUser && storedToken) {
      try {
        const user = JSON.parse(storedUser);
        dispatch({ type: "AUTH_SUCCESS", payload: user });
      } catch (error) {
        localStorage.removeItem("apex_user");
        localStorage.removeItem("apex_token");
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    dispatch({ type: "AUTH_START" });

    try {
      // Simulate API call - in real app, this would be an actual API request
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock validation - in real app, validate against backend
      if (email && password.length >= 6) {
        const user: User = {
          id: `user_${Date.now()}`,
          email,
          firstName: email.split("@")[0].split(".")[0] || "User",
          lastName: email.split("@")[0].split(".")[1] || "Name",
          phone: "",
          company: "",
          addresses: [
            {
              id: "addr_1",
              type: "shipping",
              address: "123 Business Street",
              city: "Johannesburg",
              province: "Gauteng",
              postalCode: "2000",
              country: "South Africa",
              isDefault: true,
            },
          ],
        };

        // Store in localStorage (in real app, handle JWT tokens properly)
        localStorage.setItem("apex_user", JSON.stringify(user));
        localStorage.setItem("apex_token", `token_${Date.now()}`);

        dispatch({ type: "AUTH_SUCCESS", payload: user });
      } else {
        throw new Error(
          "Invalid email or password. Password must be at least 6 characters.",
        );
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Login failed";
      dispatch({ type: "AUTH_ERROR", payload: errorMessage });
      throw error;
    }
  };

  const signup = async (userData: SignupData): Promise<void> => {
    dispatch({ type: "AUTH_START" });

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Mock validation
      if (
        !userData.email ||
        !userData.password ||
        !userData.firstName ||
        !userData.lastName
      ) {
        throw new Error("All required fields must be filled");
      }

      if (userData.password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }

      const user: User = {
        id: `user_${Date.now()}`,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone || "",
        company: userData.company || "",
        addresses: [],
      };

      // Store in localStorage
      localStorage.setItem("apex_user", JSON.stringify(user));
      localStorage.setItem("apex_token", `token_${Date.now()}`);

      dispatch({ type: "AUTH_SUCCESS", payload: user });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Signup failed";
      dispatch({ type: "AUTH_ERROR", payload: errorMessage });
      throw error;
    }
  };

  const logout = (): void => {
    localStorage.removeItem("apex_user");
    localStorage.removeItem("apex_token");
    dispatch({ type: "LOGOUT" });
  };

  const updateUser = (userData: Partial<User>): void => {
    dispatch({ type: "UPDATE_USER", payload: userData });

    // Update localStorage
    if (state.user) {
      const updatedUser = { ...state.user, ...userData };
      localStorage.setItem("apex_user", JSON.stringify(updatedUser));
    }
  };

  const clearError = (): void => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        signup,
        logout,
        updateUser,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
