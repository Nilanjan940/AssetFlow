import { axiosInstance } from './axios.config';
import { ApiResponse, PaginatedResponse } from '@/types';

export interface MaintenanceRequest {
  id: string;
  assetId: string;
  assetName: string;
  assetTag: string;
  issue: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'IN_PROGRESS' | 'RESOLVED';
  requestedBy: string;
  requestedById: string;
  approvedBy?: string;
  technician?: string;
  createdAt: string;
  updatedAt: string;
}

export const maintenanceApi = {
  getRequests: (params?: { page?: number; size?: number; status?: string }) =>
    axiosInstance.get<ApiResponse<PaginatedResponse<MaintenanceRequest>>>('/maintenance', { params }),

  getRequestById: (id: string) =>
    axiosInstance.get<ApiResponse<MaintenanceRequest>>(`/maintenance/${id}`),

  createRequest: (data: Partial<MaintenanceRequest>) =>
    axiosInstance.post<ApiResponse<MaintenanceRequest>>('/maintenance', data),

  approveRequest: (id: string) =>
    axiosInstance.post<ApiResponse<MaintenanceRequest>>(`/maintenance/${id}/approve`),

  rejectRequest: (id: string) =>
    axiosInstance.post<ApiResponse<MaintenanceRequest>>(`/maintenance/${id}/reject`),

  assignTechnician: (id: string, technicianId: string) =>
    axiosInstance.post<ApiResponse<MaintenanceRequest>>(`/maintenance/${id}/assign`, { technicianId }),

  resolveRequest: (id: string) =>
    axiosInstance.post<ApiResponse<MaintenanceRequest>>(`/maintenance/${id}/resolve`),
};