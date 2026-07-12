import { axiosInstance } from './axios.config';
import { ApiResponse } from '@/types';

export const dashboardApi = {
  getStats: () =>
    axiosInstance.get<ApiResponse<any>>('/dashboard/stats'),

  getRecentActivity: () =>
    axiosInstance.get<ApiResponse<any[]>>('/dashboard/activity'),

  getNotifications: () =>
    axiosInstance.get<ApiResponse<any[]>>('/dashboard/notifications'),
};