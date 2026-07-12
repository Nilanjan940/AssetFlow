import React from 'react';
import { cn } from '@/utils/helpers';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@/components/common/Card/Card';

interface StatCardProps {
  id: string;
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend?: number;
  trendDirection?: 'up' | 'down';
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
  loading?: boolean;
  className?: string;
}

const colorMap = {
  blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
  green: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400',
  yellow: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400',
  red: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400',
  purple: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
};

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  trendDirection = 'up',
  color = 'blue',
  loading = false,
  className,
}) => {
  if (loading) {
    return (
      <Card className={cn('overflow-hidden', className)}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="skeleton h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="skeleton h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
            <div className="skeleton h-10 w-10 rounded-lg bg-gray-200 dark:bg-gray-700" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn('overflow-hidden transition-all hover:shadow-md', className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {trend !== undefined && trend !== 0 && (
              <div className="flex items-center gap-1">
                <span
                  className={cn(
                    'text-xs font-medium',
                    trendDirection === 'up' ? 'text-green-600' : 'text-red-600'
                  )}
                >
                  {trendDirection === 'up' ? '+' : ''}{trend}%
                </span>
                {trendDirection === 'up' ? (
                  <TrendingUp className="h-3 w-3 text-green-600" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-600" />
                )}
              </div>
            )}
          </div>
          <div className={cn('rounded-lg p-3', colorMap[color])}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
};