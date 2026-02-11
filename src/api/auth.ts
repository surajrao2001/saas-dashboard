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
