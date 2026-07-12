import React from 'react';
import { cn } from '@/utils/helpers';

interface QuickActionProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  description?: string;
  color?: 'primary' | 'success' | 'info' | 'warning' | 'danger';
  onClick: () => void;
  className?: string;
}

const colorMap = {
  primary: 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400',
  success: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400',
  info: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
  warning: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400',
  danger: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400',
};

export const QuickAction: React.FC<QuickActionProps> = ({
  label,
  icon,
  description,
  color = 'primary',
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'group flex flex-col items-center justify-center p-4 rounded-lg border-2 border-dashed border-border',
        'transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:border-primary/50',
        className
      )}
    >
      <div className={cn('rounded-full p-3 mb-2 transition-colors', colorMap[color])}>
        {icon}
      </div>
      <span className="text-sm font-medium">{label}</span>
      {description && (
        <span className="text-xs text-muted-foreground">{description}</span>
      )}
    </button>
  );
};