import axiosInstance from './API';

export interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

export interface RefreshResponse {
  access_token: string;
  refresh_token: string;
}

export async function register(
  email: string,
  password: string,
  name?: string
): Promise<AuthResponse> {
  const { data } = await axiosInstance.post<AuthResponse>('/auth/register', {
    email,
    password,
    name,
  });
  return data;
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const { data } = await axiosInstance.post<AuthResponse>('/auth/login', {
    email,
    password,
  });
  return data;
}

export async function refreshToken(refreshToken: string): Promise<RefreshResponse> {
  const { data } = await axiosInstance.post<RefreshResponse>('/auth/token/refresh', {
    refresh_token: refreshToken,
  });
  return data;
}

export interface ForgotPasswordResponse {
  message: string;
  resetLink?: string;
}

export async function forgotPassword(email: string): Promise<ForgotPasswordResponse> {
  const { data } = await axiosInstance.post<ForgotPasswordResponse>('/auth/forgot-password', {
    email,
  });
  return data;
}

export interface ResetPasswordResponse {
  message: string;
}

export async function resetPassword(token: string, password: string): Promise<ResetPasswordResponse> {
  const { data } = await axiosInstance.post<ResetPasswordResponse>('/auth/reset-password', {
    token,
    password,
  });
  return data;
}
