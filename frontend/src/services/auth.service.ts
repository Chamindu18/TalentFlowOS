import api from "@/lib/axios";

import type {
  ApiMessageResponse,
  AuthResponse,
  CurrentUser,
  LoginRequest,
  RegisterRequest,
  ResendVerificationRequest,
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

  async verifyEmail(
    token: string,
  ): Promise<ApiMessageResponse> {
    const response =
      await api.get<ApiMessageResponse>(
        "/auth/verify-email",
        {
          params: {
            token,
          },
        },
      );

    return response.data;
  }

  async resendVerification(
    data: ResendVerificationRequest,
  ): Promise<ApiMessageResponse> {
    const response =
      await api.post<ApiMessageResponse>(
        "/auth/resend-verification",
        data,
      );

    return response.data;
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