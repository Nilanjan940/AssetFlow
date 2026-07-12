import React from 'react';
import { cn } from '@/utils/helpers';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const variantMap = {
  default: 'bg-primary text-primary-foreground',
  success: 'bg-success text-white',
  warning: 'bg-warning text-white',
  error: 'bg-destructive text-destructive-foreground',
  info: 'bg-info text-white',
  outline: 'border border-border bg-background text-foreground',
};

const sizeMap = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-0.5 text-sm',
  lg: 'px-3 py-1 text-base',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className,
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        variantMap[variant],
        sizeMap[size],
        className
      )}
    >
      {children}
    </span>
  );
};