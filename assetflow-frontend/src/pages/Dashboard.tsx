import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { StatCard } from '../components/common/StatCard';
import { QuickAction } from '../components/common/QuickAction';
import { Timeline } from '../components/common/Timeline';
import { useWebSocket } from '../hooks/useWebSocket';
import { RootState } from '../store';
import { fetchDashboardStats } from '../store/slices/dashboard.slice';

export const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { stats, recentActivity, loading } = useSelector(
    (state: RootState) => state.dashboard
  );
  const { user } = useSelector((state: RootState) => state.auth);

  // WebSocket for real-time updates
  const { isConnected, lastMessage } = useWebSocket(['asset-update', 'notification'], {
    url: import.meta.env.VITE_WS_URL || 'ws://localhost:8080/ws',
  });

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  useEffect(() => {
    if (lastMessage) {
      // Refresh stats when we get real-time updates
      dispatch(fetchDashboardStats());
    }
  }, [lastMessage, dispatch]);

  const statCards = [
    {
      id: 'total-assets',
      title: 'Total Assets',
      value: stats.totalAssets || 142,
      icon: <Package className="w-6 h-6" />,
      trend: 12,
      trendDirection: 'up' as const,
      color: 'blue' as const,
    },
    {
      id: 'available',
      title: 'Available',
      value: stats.available || 87,
      icon: <CheckCircle className="w-6 h-6" />,
      trend: 5,
      trendDirection: 'up' as const,
      color: 'green' as const,
    },
    {
      id: 'allocated',
      title: 'Allocated',
      value: stats.allocated || 38,
      icon: <Users className="w-6 h-6" />,
      trend: 3,
      trendDirection: 'down' as const,
      color: 'yellow' as const,
    },
    {
      id: 'overdue',
      title: 'Overdue Returns',
      value: stats.overdue || 5,
      icon: <AlertTriangle className="w-6 h-6" />,
      trend: 2,
      trendDirection: 'up' as const,
      color: 'red' as const,
    },
    {
      id: 'maintenance',
      title: 'Maintenance Today',
      value: stats.maintenanceToday || 12,
      icon: <Wrench className="w-6 h-6" />,
      trend: 4,
      trendDirection: 'down' as const,
      color: 'purple' as const,
    },
    {
      id: 'bookings',
      title: 'Active Bookings',
      value: stats.activeBookings || 8,
      icon: <Calendar className="w-6 h-6" />,
      trend: 2,
      trendDirection: 'up' as const,
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Welcome back, {user?.firstName}! Here's your operational snapshot.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isConnected ? (
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Live
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm">
              <span className="w-2 h-2 rounded-full bg-gray-400"></span>
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
          <StatCard key={stat.id} {...stat} loading={loading} />
        ))}
      </div>

      {/* Activity Timeline */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            <Clock className="inline-block w-5 h-5 mr-2 text-primary-500" />
            Recent Activity
          </h3>
          <button className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
            View All
          </button>
        </div>
        <Timeline items={recentActivity} loading={loading} />
      </Card>
    </div>
  );
};