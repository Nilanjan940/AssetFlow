import { axiosInstance } from './axios.config';
import { ApiResponse, LoginRequest, LoginResponse, RegisterRequest, User } from '@/types';

export const authApi = {
  login: (data: LoginRequest) =>
    axiosInstance.post<ApiResponse<LoginResponse>>('/auth/login', data),

  register: (data: RegisterRequest) =>
    axiosInstance.post<ApiResponse<User>>('/auth/register', data),

  logout: () =>
    axiosInstance.post<ApiResponse<void>>('/auth/logout'),

  refreshToken: (refreshToken: string) =>
    axiosInstance.post<ApiResponse<{ accessToken: string; refreshToken: string }>>(
      '/auth/refresh',
      { refreshToken }
    ),

  getCurrentUser: () =>
    axiosInstance.get<ApiResponse<User>>('/auth/me'),

  forgotPassword: (email: string) =>
    axiosInstance.post<ApiResponse<void>>('/auth/forgot-password', { email }),

  resetPassword: (token: string, password: string) =>
    axiosInstance.post<ApiResponse<void>>('/auth/reset-password', { token, password }),
};