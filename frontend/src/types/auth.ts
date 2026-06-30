export type UserRole =
  | "Candidate"
  | "Recruiter"
  | "Admin";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface AuthResponse {
  token: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

export interface CurrentUser {
  userId: string;
  email: string;
  role: UserRole;
}