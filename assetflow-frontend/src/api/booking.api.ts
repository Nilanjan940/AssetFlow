import { axiosInstance } from './axios.config';
import { ApiResponse, Booking, PaginatedResponse } from '@/types';

export interface BookingFilters {
  startDate?: string;
  endDate?: string;
  resourceId?: string;
  status?: string;
  page?: number;
  size?: number;
}

export const bookingApi = {
  getBookings: (filters: BookingFilters) =>
    axiosInstance.get<ApiResponse<PaginatedResponse<Booking>>>('/bookings', {
      params: filters,
    }),

  getBookingById: (id: string) =>
    axiosInstance.get<ApiResponse<Booking>>(`/bookings/${id}`),

  createBooking: (data: Partial<Booking>) =>
    axiosInstance.post<ApiResponse<Booking>>('/bookings', data),

  updateBooking: (id: string, data: Partial<Booking>) =>
    axiosInstance.put<ApiResponse<Booking>>(`/bookings/${id}`, data),

  cancelBooking: (id: string) =>
    axiosInstance.post<ApiResponse<void>>(`/bookings/${id}/cancel`),

  checkAvailability: (resourceId: string, startTime: string, endTime: string) =>
    axiosInstance.get<ApiResponse<boolean>>('/bookings/check-availability', {
      params: { resourceId, startTime, endTime },
    }),
};