export const APP_NAME = import.meta.env.VITE_APP_NAME || 'AssetFlow';
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0';
export const APP_ENV = import.meta.env.VITE_APP_ENV || 'development';

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';
export const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8080/ws';

export const STATUSES = {
  ASSET: {
    AVAILABLE: 'AVAILABLE',
    ALLOCATED: 'ALLOCATED',
    RESERVED: 'RESERVED',
    UNDER_MAINTENANCE: 'UNDER_MAINTENANCE',
    LOST: 'LOST',
    RETIRED: 'RETIRED',
    DISPOSED: 'DISPOSED',
  },
  BOOKING: {
    UPCOMING: 'UPCOMING',
    ONGOING: 'ONGOING',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED',
  },
  MAINTENANCE: {
    PENDING: 'PENDING',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED',
    IN_PROGRESS: 'IN_PROGRESS',
    RESOLVED: 'RESOLVED',
  },
  ALLOCATION: {
    ACTIVE: 'ACTIVE',
    RETURNED: 'RETURNED',
    OVERDUE: 'OVERDUE',
    TRANSFERRED: 'TRANSFERRED',
  },
};

export const ROLES = {
  ADMIN: 'ADMIN',
  ASSET_MANAGER: 'ASSET_MANAGER',
  DEPARTMENT_HEAD: 'DEPARTMENT_HEAD',
  EMPLOYEE: 'EMPLOYEE',
};

export const COLORS = {
  primary: '#4F46E5',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
};

export const PAGINATION = {
  DEFAULT_PAGE: 0,
  DEFAULT_SIZE: 10,
  SIZE_OPTIONS: [10, 25, 50, 100],
};

export const DATE_FORMATS = {
  DISPLAY: 'MMM d, yyyy',
  DISPLAY_TIME: 'MMM d, yyyy h:mm a',
  API: 'yyyy-MM-dd',
  API_TIME: 'yyyy-MM-dd HH:mm:ss',
  TIME: 'h:mm a',
  SHORT: 'MM/dd/yyyy',
};