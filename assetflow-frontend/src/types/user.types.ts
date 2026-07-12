import { BaseEntity } from './common.types';

export type UserRole = 'ADMIN' | 'ASSET_MANAGER' | 'DEPARTMENT_HEAD' | 'EMPLOYEE';

export interface User extends BaseEntity {
  email: string;
  firstName: string;
  lastName: string;
  employeeId: string;
  role: UserRole;
  departmentId: string;
  departmentName?: string;
  phone?: string;
  position?: string;
  isActive: boolean;
  lastLogin?: string;
  profilePictureUrl?: string;
}

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