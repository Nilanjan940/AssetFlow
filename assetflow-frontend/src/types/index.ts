// User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'ASSET_MANAGER' | 'DEPARTMENT_HEAD' | 'EMPLOYEE';
  departmentId: string;
  departmentName?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  phone?: string;
  position?: string;
  employeeId?: string;
}

// Asset Types
export interface Asset {
  id: string;
  assetTag: string;
  name: string;
  description?: string;
  categoryId: string;
  categoryName?: string;
  serialNumber?: string;
  status: 'AVAILABLE' | 'ALLOCATED' | 'RESERVED' | 'UNDER_MAINTENANCE' | 'LOST' | 'RETIRED' | 'DISPOSED';
  location?: string;
  holderId?: string;
  holder?: User;
  departmentId?: string;
  acquisitionDate: string;
  acquisitionCost: number;
  condition: 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR' | 'DAMAGED';
  isSharedBookable: boolean;
  imageUrls: string[];
  customFields?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

// Booking Types
export interface Booking {
  id: string;
  resourceId: string;
  resourceName: string;
  bookedBy: User;
  bookedById: string;
  departmentId: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  status: 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';
  purpose?: string;
  createdAt: string;
  updatedAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  empty: boolean;
}

export interface ApiError {
  success: false;
  statusCode: number;
  error: {
    code: string;
    message: string;
    details?: Record<string, string>;
  };
  timestamp: string;
}

// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  departmentId: string;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  position?: string;
  departmentId?: string;
}

export type Status = 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'APPROVED' | 'REJECTED';
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';