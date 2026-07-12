import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { dashboardApi } from '@/api/dashboard.api';

interface DashboardState {
  stats: {
    totalAssets: number;
    available: number;
    allocated: number;
    overdueReturns: number;
    maintenanceToday: number;
    activeBookings: number;
    totalAssetsTrend: number;
    availableTrend: number;
    allocatedTrend: number;
    overdueTrend: number;
    maintenanceTrend: number;
    bookingsTrend: number;
  } | null;
  recentActivity: any[];
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  stats: null,
  recentActivity: [],
  loading: false,
  error: null,
};

export const fetchDashboardStats = createAsyncThunk(
  'dashboard/fetchStats',
  async () => {
    const response = await dashboardApi.getStats();
    return response.data.data;
  }
);

export const fetchRecentActivity = createAsyncThunk(
  'dashboard/fetchRecentActivity',
  async () => {
    const response = await dashboardApi.getRecentActivity();
    return response.data.data;
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Stats
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch dashboard stats';
      })
      // Fetch Recent Activity
      .addCase(fetchRecentActivity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecentActivity.fulfilled, (state, action) => {
        state.loading = false;
        state.recentActivity = action.payload;
      })
      .addCase(fetchRecentActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch recent activity';
      });
  },
});

export const { clearError } = dashboardSlice.actions;
export default dashboardSlice.reducer;