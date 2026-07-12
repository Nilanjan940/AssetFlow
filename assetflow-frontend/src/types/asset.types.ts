import { BaseEntity } from './common.types';
import { User } from './user.types';

export type AssetStatus = 
  | 'AVAILABLE' 
  | 'ALLOCATED' 
  | 'RESERVED' 
  | 'UNDER_MAINTENANCE' 
  | 'LOST' 
  | 'RETIRED' 
  | 'DISPOSED';

export type AssetCondition = 
  | 'EXCELLENT' 
  | 'GOOD' 
  | 'FAIR' 
  | 'POOR' 
  | 'DAMAGED';

export interface Asset extends BaseEntity {
  assetTag: string;
  name: string;
  description?: string;
  categoryId: string;
  categoryName?: string;
  serialNumber?: string;
  status: AssetStatus;
  location?: string;
  currentHolderId?: string;
  currentHolder?: User;
  departmentId?: string;
  acquisitionDate: string;
  acquisitionCost: number;
  condition: AssetCondition;
  isSharedBookable: boolean;
  imageUrls: string[];
  customFields?: Record<string, any>;
}

export interface AssetAllocation extends BaseEntity {
  assetId: string;
  assetName: string;
  assetTag: string;
  allocatedToUserId: string;
  allocatedToUser: User;
  departmentId: string;
  allocatedBy: string;
  expectedReturnDate: string;
  actualReturnDate?: string;
  status: 'ACTIVE' | 'RETURNED' | 'OVERDUE' | 'TRANSFERRED';
  conditionCheckInNotes?: string;
  notes?: string;
}