import { axiosInstance } from './axios.config';
import { ApiResponse, PaginatedResponse } from '@/types';

export interface AuditCycle {
  id: string;
  title: string;
  scope: string;
  startDate: string;
  endDate: string;
  status: 'DRAFT' | 'IN_PROGRESS' | 'COMPLETED' | 'CLOSED';
  auditors: string[];
  discrepancies: number;
  createdAt: string;
  updatedAt: string;
}

export const auditApi = {
  getCycles: (params?: { page?: number; size?: number; status?: string }) =>
    axiosInstance.get<ApiResponse<PaginatedResponse<AuditCycle>>>('/audit', { params }),

  getCycleById: (id: string) =>
    axiosInstance.get<ApiResponse<AuditCycle>>(`/audit/${id}`),

  createCycle: (data: Partial<AuditCycle>) =>
    axiosInstance.post<ApiResponse<AuditCycle>>('/audit', data),

  updateCycle: (id: string, data: Partial<AuditCycle>) =>
    axiosInstance.put<ApiResponse<AuditCycle>>(`/audit/${id}`, data),

  closeCycle: (id: string) =>
    axiosInstance.post<ApiResponse<AuditCycle>>(`/audit/${id}/close`),

  getDiscrepancyReport: (id: string) =>
    axiosInstance.get<ApiResponse<any>>(`/audit/${id}/discrepancies`),
};