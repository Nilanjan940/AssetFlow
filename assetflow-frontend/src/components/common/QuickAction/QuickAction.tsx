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
  success: 'bg-success/10 text-success dark:bg-success/20',
  info: 'bg-info/10 text-info dark:bg-info/20',
  warning: 'bg-warning/10 text-warning dark:bg-warning/20',
  danger: 'bg-destructive/10 text-destructive dark:bg-destructive/20',
};

const hoverMap = {
  primary: 'hover:border-primary/50 hover:shadow-primary/10',
  success: 'hover:border-success/50 hover:shadow-success/10',
  info: 'hover:border-info/50 hover:shadow-info/10',
  warning: 'hover:border-warning/50 hover:shadow-warning/10',
  danger: 'hover:border-destructive/50 hover:shadow-destructive/10',
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
        'transition-all duration-200 hover:scale-[1.02] hover:shadow-lg',
        hoverMap[color],
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