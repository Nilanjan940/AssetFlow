export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
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

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  timestamp: string;
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

export type Status = 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'APPROVED' | 'REJECTED';
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';