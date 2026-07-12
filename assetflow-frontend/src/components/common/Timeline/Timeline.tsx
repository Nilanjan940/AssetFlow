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
  info: 'border-info bg-info/20',
  success: 'border-success bg-success/20',
  warning: 'border-warning bg-warning/20',
  error: 'border-destructive bg-destructive/20',
  primary: 'border-primary bg-primary/20',
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
            <div className="skeleton h-4 w-4 rounded-full mt-1.5" />
            <div className="flex-1 space-y-2">
              <div className="skeleton h-4 w-32" />
              <div className="skeleton h-3 w-48" />
              <div className="skeleton h-3 w-24" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
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
                dotColorMap[item.type]
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