import { create } from "zustand";
import authService from "@/services/auth.service";
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "@/types/auth";

interface AuthState {
  user: AuthResponse | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem("accessToken"),
  isAuthenticated: !!localStorage.getItem("accessToken"),
  isLoading: false,

  login: async (data) => {
    set({ isLoading: true });
    try {
      const response = await authService.login(data);
      localStorage.setItem("accessToken", response.token);

      set({
        user: response,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  register: async (data) => {
    set({ isLoading: true });
    try {
      await authService.register(data);
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },

  initializeAuth: async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      set({ isAuthenticated: false, isLoading: false });
      return;
    }

    try {
      // Cast the response to any to bypass the missing property restrictions on CurrentUser
      const currentUser = await authService.getCurrentUser() as any;

      set({
        token,
        user: {
          token,
          userId: currentUser.userId,
          email: currentUser.email,
          firstName: currentUser.firstName || "", 
          lastName: currentUser.lastName || "",
          role: currentUser.role,
        } as unknown as AuthResponse,
        isAuthenticated: true,
      });
    } catch (error) {
      console.error("Auth initialization failed, clearing token...", error);
      localStorage.removeItem("accessToken");
      set({
        user: null,
        token: null,
        isAuthenticated: false,
      });
    }
  },
}));