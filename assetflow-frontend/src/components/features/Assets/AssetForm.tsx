import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/common/Button/Button';
import { cn } from '@/utils/helpers';
import toast from 'react-hot-toast';

const assetSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().optional(),
  categoryId: z.string().min(1, 'Please select a category'),
  serialNumber: z.string().optional(),
  location: z.string().optional(),
  acquisitionDate: z.string().optional(),
  acquisitionCost: z.number().min(0, 'Cost must be positive').optional(),
  condition: z.enum(['EXCELLENT', 'GOOD', 'FAIR', 'POOR', 'DAMAGED']),
  isSharedBookable: z.boolean().default(false),
});

type AssetFormData = z.infer<typeof assetSchema>;

interface AssetFormProps {
  mode: 'create' | 'edit' | 'view';
  asset?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

export const AssetForm: React.FC<AssetFormProps> = ({
  mode,
  asset,
  onSuccess,
  onCancel,
}) => {
  const isViewMode = mode === 'view';
  const isEditMode = mode === 'edit';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AssetFormData>({
    resolver: zodResolver(assetSchema),
    defaultValues: asset || {
      condition: 'GOOD',
      isSharedBookable: false,
    },
  });

  const onSubmit = async (data: AssetFormData) => {
    try {
      console.log('Form data:', data);
      toast.success(isEditMode ? 'Asset updated successfully' : 'Asset registered successfully');
      onSuccess();
    } catch (error) {
      toast.error('Failed to save asset');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Asset Name *
          </label>
          <input
            id="name"
            type="text"
            disabled={isViewMode}
            className={cn(
              'w-full px-3 py-2 rounded-md border bg-background text-sm',
              'focus:outline-none focus:ring-2 focus:ring-primary',
              errors.name ? 'border-destructive' : 'border-input',
              isViewMode && 'opacity-70 cursor-not-allowed'
            )}
            {...register('name')}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="categoryId" className="text-sm font-medium">
            Category *
          </label>
          <select
            id="categoryId"
            disabled={isViewMode}
            className={cn(
              'w-full px-3 py-2 rounded-md border bg-background text-sm',
              'focus:outline-none focus:ring-2 focus:ring-primary',
              errors.categoryId ? 'border-destructive' : 'border-input',
              isViewMode && 'opacity-70 cursor-not-allowed'
            )}
            {...register('categoryId')}
          >
            <option value="">Select Category</option>
            <option value="electronics">Electronics</option>
            <option value="furniture">Furniture</option>
            <option value="vehicles">Vehicles</option>
            <option value="equipment">Equipment</option>
          </select>
          {errors.categoryId && (
            <p className="text-sm text-destructive">{errors.categoryId.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="serialNumber" className="text-sm font-medium">
            Serial Number
          </label>
          <input
            id="serialNumber"
            type="text"
            disabled={isViewMode}
            className={cn(
              'w-full px-3 py-2 rounded-md border bg-background text-sm',
              'focus:outline-none focus:ring-2 focus:ring-primary',
              errors.serialNumber ? 'border-destructive' : 'border-input',
              isViewMode && 'opacity-70 cursor-not-allowed'
            )}
            {...register('serialNumber')}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="location" className="text-sm font-medium">
            Location
          </label>
          <input
            id="location"
            type="text"
            disabled={isViewMode}
            className={cn(
              'w-full px-3 py-2 rounded-md border bg-background text-sm',
              'focus:outline-none focus:ring-2 focus:ring-primary',
              errors.location ? 'border-destructive' : 'border-input',
              isViewMode && 'opacity-70 cursor-not-allowed'
            )}
            {...register('location')}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="acquisitionDate" className="text-sm font-medium">
            Acquisition Date
          </label>
          <input
            id="acquisitionDate"
            type="date"
            disabled={isViewMode}
            className={cn(
              'w-full px-3 py-2 rounded-md border bg-background text-sm',
              'focus:outline-none focus:ring-2 focus:ring-primary',
              errors.acquisitionDate ? 'border-destructive' : 'border-input',
              isViewMode && 'opacity-70 cursor-not-allowed'
            )}
            {...register('acquisitionDate')}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="acquisitionCost" className="text-sm font-medium">
            Acquisition Cost ($)
          </label>
          <input
            id="acquisitionCost"
            type="number"
            step="0.01"
            disabled={isViewMode}
            className={cn(
              'w-full px-3 py-2 rounded-md border bg-background text-sm',
              'focus:outline-none focus:ring-2 focus:ring-primary',
              errors.acquisitionCost ? 'border-destructive' : 'border-input',
              isViewMode && 'opacity-70 cursor-not-allowed'
            )}
            {...register('acquisitionCost', { valueAsNumber: true })}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="condition" className="text-sm font-medium">
            Condition *
          </label>
          <select
            id="condition"
            disabled={isViewMode}
            className={cn(
              'w-full px-3 py-2 rounded-md border bg-background text-sm',
              'focus:outline-none focus:ring-2 focus:ring-primary',
              errors.condition ? 'border-destructive' : 'border-input',
              isViewMode && 'opacity-70 cursor-not-allowed'
            )}
            {...register('condition')}
          >
            <option value="EXCELLENT">Excellent</option>
            <option value="GOOD">Good</option>
            <option value="FAIR">Fair</option>
            <option value="POOR">Poor</option>
            <option value="DAMAGED">Damaged</option>
          </select>
          {errors.condition && (
            <p className="text-sm text-destructive">{errors.condition.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Shared/Bookable</label>
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              disabled={isViewMode}
              className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
              {...register('isSharedBookable')}
            />
            <span className="text-sm text-muted-foreground">
              Mark as shared resource
            </span>
          </div>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label htmlFor="description" className="text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            rows={3}
            disabled={isViewMode}
            className={cn(
              'w-full px-3 py-2 rounded-md border bg-background text-sm',
              'focus:outline-none focus:ring-2 focus:ring-primary',
              errors.description ? 'border-destructive' : 'border-input',
              isViewMode && 'opacity-70 cursor-not-allowed'
            )}
            {...register('description')}
          />
        </div>
      </div>

      {!isViewMode && (
        <div className="flex items-center justify-end gap-2 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                Saving...
              </div>
            ) : (
              isEditMode ? 'Update Asset' : 'Register Asset'
            )}
          </Button>
        </div>
      )}
    </form>
  );
};