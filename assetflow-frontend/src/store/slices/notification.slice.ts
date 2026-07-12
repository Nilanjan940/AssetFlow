import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
  link?: string;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
}

const initialState: NotificationState = {
  notifications: [
    {
      id: '1',
      title: 'Asset Allocated',
      message: 'Laptop AF-0114 has been allocated to Priya Sharma',
      type: 'success',
      read: false,
      createdAt: new Date(Date.now() - 120000).toISOString(),
    },
    {
      id: '2',
      title: 'Maintenance Request',
      message: 'Server rack AF-0056 needs immediate cooling repair',
      type: 'warning',
      read: false,
      createdAt: new Date(Date.now() - 900000).toISOString(),
    },
    {
      id: '3',
      title: 'Overdue Return',
      message: 'Projector AF-0023 is 2 days overdue from Marketing Dept',
      type: 'error',
      read: false,
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
  ],
  unreadCount: 3,
  loading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id' | 'createdAt'>>) => {
      const newNotification: Notification = {
        ...action.payload,
        id: `notif-${Date.now()}`,
        createdAt: new Date().toISOString(),
        read: false,
      };
      state.notifications.unshift(newNotification);
      state.unreadCount += 1;
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find((n) => n.id === action.payload);
      if (notification && !notification.read) {
        notification.read = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach((n) => (n.read = true));
      state.unreadCount = 0;
    },
    clearNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      const index = state.notifications.findIndex((n) => n.id === action.payload);
      if (index !== -1) {
        const notification = state.notifications[index];
        if (!notification.read) {
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
        state.notifications.splice(index, 1);
      }
    },
  },
});

export const {
  addNotification,
  markAsRead,
  markAllAsRead,
  clearNotifications,
  removeNotification,
} = notificationSlice.actions;

export default notificationSlice.reducer;