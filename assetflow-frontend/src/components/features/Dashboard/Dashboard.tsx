import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Package, 
  CheckCircle, 
  Users, 
  AlertTriangle, 
  Calendar, 
  Clock,
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
import { dashboardApi } from '@/api/dashboard.api';

// Mock data for when API is not available
const mockStats = {
  totalAssets: 142,
  available: 87,
  allocated: 38,
  overdueReturns: 5,
  maintenanceToday: 12,
  activeBookings: 8,
  totalAssetsTrend: 12,
  availableTrend: 5,
  allocatedTrend: -3,
  overdueTrend: 2,
  maintenanceTrend: -4,
  bookingsTrend: 2,
  recentActivity: [
    {
      id: '1',
      title: 'Asset Allocated',
      description: 'Laptop AF-0114 allocated to Priya Sharma',
      time: new Date(Date.now() - 600000).toISOString(),
      type: 'success' as const,
      user: 'John Doe',
    },
    {
      id: '2',
      title: 'Asset Returned',
      description: 'Projector AF-0023 returned by Raj Kumar',
      time: new Date(Date.now() - 2700000).toISOString(),
      type: 'info' as const,
      user: 'Raj Kumar',
    },
    {
      id: '3',
      title: 'Maintenance Request',
      description: 'Server rack AF-0056 needs cooling repair',
      time: new Date(Date.now() - 7200000).toISOString(),
      type: 'warning' as const,
      user: 'IT Team',
    },
  ],
};

export const Dashboard: React.FC = () => {
  // Use React Query for data fetching
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      try {
        const response = await dashboardApi.getStats();
        return response.data.data;
      } catch (error) {
        console.warn('Using mock data for dashboard');
        return mockStats;
      }
    },
    refetchInterval: 30000,
    initialData: mockStats,
  });

  const stats = data || mockStats;

  // WebSocket for real-time updates
  const { isConnected } = useWebSocket(['dashboard-update', 'notification'], {
    url: import.meta.env.VITE_WS_URL || 'ws://localhost:8080/ws',
    onMessage: () => {
      refetch();
    },
  });

  const statCards = [
    {
      id: 'total-assets',
      title: 'Total Assets',
      value: stats.totalAssets || 0,
      icon: <Package className="w-6 h-6" />,
      trend: stats.totalAssetsTrend || 0,
      trendDirection: (stats.totalAssetsTrend || 0) >= 0 ? 'up' as const : 'down' as const,
      color: 'blue' as const,
    },
    {
      id: 'available',
      title: 'Available',
      value: stats.available || 0,
      icon: <CheckCircle className="w-6 h-6" />,
      trend: stats.availableTrend || 0,
      trendDirection: (stats.availableTrend || 0) >= 0 ? 'up' as const : 'down' as const,
      color: 'green' as const,
    },
    {
      id: 'allocated',
      title: 'Allocated',
      value: stats.allocated || 0,
      icon: <Users className="w-6 h-6" />,
      trend: stats.allocatedTrend || 0,
      trendDirection: (stats.allocatedTrend || 0) >= 0 ? 'up' as const : 'down' as const,
      color: 'yellow' as const,
    },
    {
      id: 'overdue',
      title: 'Overdue Returns',
      value: stats.overdueReturns || 0,
      icon: <AlertTriangle className="w-6 h-6" />,
      trend: stats.overdueTrend || 0,
      trendDirection: (stats.overdueTrend || 0) >= 0 ? 'up' as const : 'down' as const,
      color: 'red' as const,
    },
    {
      id: 'maintenance',
      title: 'Maintenance Today',
      value: stats.maintenanceToday || 0,
      icon: <Wrench className="w-6 h-6" />,
      trend: stats.maintenanceTrend || 0,
      trendDirection: (stats.maintenanceTrend || 0) >= 0 ? 'up' as const : 'down' as const,
      color: 'purple' as const,
    },
    {
      id: 'bookings',
      title: 'Active Bookings',
      value: stats.activeBookings || 0,
      icon: <Calendar className="w-6 h-6" />,
      trend: stats.bookingsTrend || 0,
      trendDirection: (stats.bookingsTrend || 0) >= 0 ? 'up' as const : 'down' as const,
      color: 'blue' as const,
    },
  ];

  const quickActions = [
    {
      id: 'register-asset',
      label: 'Register Asset',
      icon: <Plus className="w-5 h-5" />,
      description: 'Add new equipment',
      color: 'primary' as const,
      onClick: () => console.log('Register Asset'),
    },
    {
      id: 'allocate-asset',
      label: 'Allocate Asset',
      icon: <Users className="w-5 h-5" />,
      description: 'Assign to employee',
      color: 'success' as const,
      onClick: () => console.log('Allocate Asset'),
    },
    {
      id: 'book-resource',
      label: 'Book Resource',
      icon: <CalendarPlus className="w-5 h-5" />,
      description: 'Schedule a booking',
      color: 'info' as const,
      onClick: () => console.log('Book Resource'),
    },
    {
      id: 'raise-maintenance',
      label: 'Maintenance',
      icon: <Wrench className="w-5 h-5" />,
      description: 'Raise a request',
      color: 'warning' as const,
      onClick: () => console.log('Raise Maintenance'),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Welcome back! Here's your operational snapshot.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          {isConnected ? (
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Live
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm">
              <span className="w-2 h-2 rounded-full bg-gray-400" />
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
            items={stats.recentActivity || []} 
            loading={isLoading} 
          />
        </CardContent>
      </Card>
    </div>
  );
};