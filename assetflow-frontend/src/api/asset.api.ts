import { axiosInstance } from './axios.config';
import { ApiResponse, Asset, PaginatedResponse } from '@/types';

export interface AssetFilters {
  search?: string;
  categoryId?: string;
  status?: string;
  departmentId?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: 'ASC' | 'DESC';
}

export const assetApi = {
  getAssets: (filters: AssetFilters) =>
    axiosInstance.get<ApiResponse<PaginatedResponse<Asset>>>('/assets', {
      params: filters,
    }),

  getAssetById: (id: string) =>
    axiosInstance.get<ApiResponse<Asset>>(`/assets/${id}`),

  createAsset: (data: Partial<Asset>) =>
    axiosInstance.post<ApiResponse<Asset>>('/assets', data),

  updateAsset: (id: string, data: Partial<Asset>) =>
    axiosInstance.put<ApiResponse<Asset>>(`/assets/${id}`, data),

  deleteAsset: (id: string) =>
    axiosInstance.delete<ApiResponse<void>>(`/assets/${id}`),

  getAssetHistory: (id: string) =>
    axiosInstance.get<ApiResponse<any[]>>(`/assets/${id}/history`),

  getAssetQRCode: (id: string) =>
    axiosInstance.get<ApiResponse<string>>(`/assets/${id}/qrcode`),
};