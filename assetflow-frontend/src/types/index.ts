// User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'ASSET_MANAGER' | 'DEPARTMENT_HEAD' | 'EMPLOYEE';
  department: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Asset Types
export interface Asset {
  id: string;
  assetTag: string;
  name: string;
  description: string;
  category: string;
  serialNumber: string;
  status: 'AVAILABLE' | 'ALLOCATED' | 'RESERVED' | 'UNDER_MAINTENANCE' | 'LOST' | 'RETIRED' | 'DISPOSED';
  location: string;
  holder?: User;
  department?: string;
  acquisitionDate: string;
  acquisitionCost: number;
  condition: 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR' | 'DAMAGED';
  isSharedBookable: boolean;
  imageUrls: string[];
  createdAt: string;
  updatedAt: string;
}

// Booking Types
export interface Booking {
  id: string;
  resourceId: string;
  resourceName: string;
  bookedBy: User;
  department: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  status: 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';
  purpose: string;
  createdAt: string;
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
}