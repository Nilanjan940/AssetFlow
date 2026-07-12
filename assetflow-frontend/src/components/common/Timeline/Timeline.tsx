import React from 'react';
import { formatDate } from '@/utils/helpers';
import { cn } from '@/utils/helpers';

interface TimelineItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'primary';
  user?: string;
  icon?: React.ReactNode;
}

interface TimelineProps {
  items: TimelineItem[];
  loading?: boolean;
  className?: string;
}

const dotColorMap = {
  info: 'border-blue-400 bg-blue-100 dark:bg-blue-900/30',
  success: 'border-green-400 bg-green-100 dark:bg-green-900/30',
  warning: 'border-yellow-400 bg-yellow-100 dark:bg-yellow-900/30',
  error: 'border-red-400 bg-red-100 dark:bg-red-900/30',
  primary: 'border-primary bg-primary-100 dark:bg-primary-900/30',
};

export const Timeline: React.FC<TimelineProps> = ({
  items,
  loading = false,
  className,
}) => {
  if (loading) {
    return (
      <div className={cn('space-y-4', className)}>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex gap-4">
            <div className="skeleton h-4 w-4 rounded-full mt-1.5 bg-gray-200 dark:bg-gray-700" />
            <div className="flex-1 space-y-2">
              <div className="skeleton h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="skeleton h-3 w-48 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="skeleton h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No activity to display</p>
      </div>
    );
  }

  return (
    <div className={cn('relative space-y-4', className)}>
      {items.map((item, index) => (
        <div key={item.id} className="flex gap-4">
          <div className="relative flex flex-col items-center">
            <div
              className={cn(
                'h-4 w-4 rounded-full border-2',
                dotColorMap[item.type] || dotColorMap.primary
              )}
            />
            {index < items.length - 1 && (
              <div className="absolute top-4 bottom-0 w-0.5 -translate-x-1/2 bg-border" />
            )}
          </div>
          <div className="flex-1 pb-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-sm">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                {item.user && (
                  <p className="text-xs text-muted-foreground mt-1">
                    by {item.user}
                  </p>
                )}
              </div>
              <time className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                {formatDate(item.time)}
              </time>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};