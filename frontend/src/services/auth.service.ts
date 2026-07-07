import api from "@/lib/axios";

import type {
  AuthResponse,
  CurrentUser,
  LoginRequest,
  RegisterRequest,
} from "@/types/auth";

class AuthService {
  async register(
    data: RegisterRequest,
  ): Promise<AuthResponse> {
    const response =
      await api.post<AuthResponse>(
        "/auth/register",
        data,
      );

    return response.data;
  }

  async login(
    data: LoginRequest,
  ): Promise<AuthResponse> {
    const response =
      await api.post<AuthResponse>(
        "/auth/login",
        data,
      );

    return response.data;
  }

  async forgotPassword(
    email: string,
  ): Promise<void> {
    await api.post(
      "/auth/forgot-password",
      {
        email,
      },
    );
  }

  async resetPassword(
    token: string,
    newPassword: string,
  ): Promise<void> {
    await api.post(
      "/auth/reset-password",
      {
        token,
        newPassword,
      },
    );
  }

  async getCurrentUser(): Promise<CurrentUser> {
    const response =
      await api.get<CurrentUser>(
        "/auth/me",
      );

    return response.data;
  }
}

export default new AuthService();