import axios from 'axios';
import { store } from '@/store';
import { logout, refreshToken } from '@/store/slices/auth.slice';
import { toast } from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

export const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000'),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Track if refresh is in progress
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: Error | null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(null);
    }
  });
  failedQueue = [];
};

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Don't retry if it's a refresh token request or already retried
    if (
      originalRequest.url?.includes('/auth/refresh') ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        originalRequest._retry = true;

        try {
          const refreshToken = localStorage.getItem('refreshToken');
          if (!refreshToken) {
            throw new Error('No refresh token available');
          }

          const response = await axios.post(
            `${API_URL}/auth/refresh`,
            { refreshToken }
          );

          const { accessToken, refreshToken: newRefreshToken } = response.data.data;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', newRefreshToken);

          processQueue(null);
          isRefreshing = false;

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError as Error);
          isRefreshing = false;

          // Clear tokens and redirect to login
          store.dispatch(logout());
          toast.error('Session expired. Please login again.');
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      } else {
        // If refresh is already in progress, queue the request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            // Retry original request after token refresh
            const newToken = localStorage.getItem('accessToken');
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }
    }

    // Handle other errors
    if (error.response?.data?.error?.message) {
      const message = error.response.data.error.message;
      if (error.response.status >= 500) {
        toast.error('Server error. Please try again later.');
      } else if (error.response.status === 403) {
        toast.error('You do not have permission to perform this action.');
      } else if (error.response.status === 404) {
        // Resource not found - handled by components
      } else {
        toast.error(message);
      }
    } else if (error.message === 'Network Error') {
      toast.error('Network error. Please check your connection.');
    }

    return Promise.reject(error);
  }
);