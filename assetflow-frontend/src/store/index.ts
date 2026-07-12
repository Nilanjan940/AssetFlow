import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import assetReducer from './slices/asset.slice';
import bookingReducer from './slices/booking.slice';
import dashboardReducer from './slices/dashboard.slice';
import notificationReducer from './slices/notification.slice';
import uiReducer from './slices/ui.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    assets: assetReducer,
    bookings: bookingReducer,
    dashboard: dashboardReducer,
    notifications: notificationReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;