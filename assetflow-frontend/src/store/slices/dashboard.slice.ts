import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { dashboardApi } from '@/api/dashboard.api';

interface DashboardState {
  stats: any;
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

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
        state.recentActivity = action.payload.recentActivity || [];
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch dashboard stats';
      });
  },
});

export default dashboardSlice.reducer;