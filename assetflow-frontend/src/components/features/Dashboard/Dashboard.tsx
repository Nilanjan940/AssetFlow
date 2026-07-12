import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { 
  TrendingUp, 
  TrendingDown, 
  Package, 
  CheckCircle, 
  AlertTriangle, 
  Calendar, 
  Clock, 
  Users,
  Plus,
  CalendarPlus,
  Wrench,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card/Card';
import { Button } from '@/components/common/Button/Button';
import { StatCard } from '@/components/common/StatCard/StatCard';
import { QuickAction } from '@/components/common/QuickAction/QuickAction';
import { Timeline } from '@/components/common/Timeline/Timeline';
import { useWebSocket } from '@/hooks/useWebSocket';
import { RootState } from '@/store';
import { dashboardApi } from '@/api/dashboard.api';
import { cn } from '@/utils/helpers';

export const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  
  const { data: stats, isLoading, refetch } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: dashboardApi.getStats,
    refetchInterval: 30000,
  });

  // WebSocket for real-time updates
  const { isConnected, lastMessage } = useWebSocket(['dashboard-update', 'notification'], {
    url: import.meta.env.VITE_WS_URL || 'ws://localhost:8080/ws',
    onMessage: (data) => {
      if (data.type === 'stats-update') {
        refetch();
      }
    },
  });

  const statCards = [
    {
      id: 'total-assets',
      title: 'Total Assets',
      value: stats?.data.totalAssets || 0,
      icon: <Package className="w-6 h-6" />,
      trend: stats?.data.totalAssetsTrend || 0,
      trendDirection: stats?.data.totalAssetsTrend >= 0 ? 'up' : 'down',
      color: 'blue',
    },
    {
      id: 'available',
      title: 'Available',
      value: stats?.data.available || 0,
      icon: <CheckCircle className="w-6 h-6" />,
      trend: stats?.data.availableTrend || 0,
      trendDirection: stats?.data.availableTrend >= 0 ? 'up' : 'down',
      color: 'green',
    },
    {
      id: 'allocated',
      title: 'Allocated',
      value: stats?.data.allocated || 0,
      icon: <Users className="w-6 h-6" />,
      trend: stats?.data.allocatedTrend || 0,
      trendDirection: stats?.data.allocatedTrend >= 0 ? 'up' : 'down',
      color: 'yellow',
    },
    {
      id: 'overdue',
      title: 'Overdue Returns',
      value: stats?.data.overdueReturns || 0,
      icon: <AlertTriangle className="w-6 h-6" />,
      trend: stats?.data.overdueTrend || 0,
      trendDirection: stats?.data.overdueTrend >= 0 ? 'up' : 'down',
      color: 'red',
    },
    {
      id: 'maintenance',
      title: 'Maintenance Today',
      value: stats?.data.maintenanceToday || 0,
      icon: <Wrench className="w-6 h-6" />,
      trend: stats?.data.maintenanceTrend || 0,
      trendDirection: stats?.data.maintenanceTrend >= 0 ? 'up' : 'down',
      color: 'purple',
    },
    {
      id: 'bookings',
      title: 'Active Bookings',
      value: stats?.data.activeBookings || 0,
      icon: <Calendar className="w-6 h-6" />,
      trend: stats?.data.bookingsTrend || 0,
      trendDirection: stats?.data.bookingsTrend >= 0 ? 'up' : 'down',
      color: 'blue',
    },
  ];

  const quickActions = [
    {
      id: 'register-asset',
      label: 'Register Asset',
      icon: <Plus className="w-5 h-5" />,
      description: 'Add new equipment',
      color: 'primary',
      onClick: () => {/* Open modal */},
    },
    {
      id: 'allocate-asset',
      label: 'Allocate Asset',
      icon: <Users className="w-5 h-5" />,
      description: 'Assign to employee',
      color: 'success',
      onClick: () => {/* Open modal */},
    },
    {
      id: 'book-resource',
      label: 'Book Resource',
      icon: <CalendarPlus className="w-5 h-5" />,
      description: 'Schedule a booking',
      color: 'info',
      onClick: () => {/* Open modal */},
    },
    {
      id: 'raise-maintenance',
      label: 'Maintenance',
      icon: <Wrench className="w-5 h-5" />,
      description: 'Raise a request',
      color: 'warning',
      onClick: () => {/* Open modal */},
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Welcome back, {user?.firstName}! Here's your operational snapshot.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          {isConnected ? (
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success/10 text-success text-sm">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              Live
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm">
              <span className="w-2 h-2 rounded-full bg-muted-foreground" />
              Offline
            </span>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <QuickAction key={action.id} {...action} />
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statCards.map((stat) => (
          <StatCard key={stat.id} {...stat} loading={isLoading} />
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Timeline 
            items={stats?.data.recentActivity || []} 
            loading={isLoading} 
          />
        </CardContent>
      </Card>
    </div>
  );
};