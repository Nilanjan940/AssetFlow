import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { bookingApi } from '@/api/booking.api';
import { Booking, PaginatedResponse } from '@/types';

interface BookingState {
  bookings: Booking[];
  selectedBooking: Booking | null;
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}

const initialState: BookingState = {
  bookings: [],
  selectedBooking: null,
  loading: false,
  error: null,
  pagination: {
    page: 0,
    size: 10,
    totalElements: 0,
    totalPages: 0,
  },
};

export const fetchBookings = createAsyncThunk(
  'bookings/fetchBookings',
  async (params: {
    startDate?: string;
    endDate?: string;
    resourceId?: string;
    status?: string;
    page?: number;
    size?: number;
  }) => {
    const response = await bookingApi.getBookings(params);
    return response.data.data;
  }
);

export const fetchBookingById = createAsyncThunk(
  'bookings/fetchBookingById',
  async (id: string) => {
    const response = await bookingApi.getBookingById(id);
    return response.data.data;
  }
);

export const createBooking = createAsyncThunk(
  'bookings/createBooking',
  async (data: Partial<Booking>) => {
    const response = await bookingApi.createBooking(data);
    return response.data.data;
  }
);

export const updateBooking = createAsyncThunk(
  'bookings/updateBooking',
  async ({ id, data }: { id: string; data: Partial<Booking> }) => {
    const response = await bookingApi.updateBooking(id, data);
    return response.data.data;
  }
);

export const cancelBooking = createAsyncThunk(
  'bookings/cancelBooking',
  async (id: string) => {
    await bookingApi.cancelBooking(id);
    return id;
  }
);

const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    clearSelectedBooking: (state) => {
      state.selectedBooking = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Bookings
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload.content;
        state.pagination = {
          page: action.payload.page,
          size: action.payload.size,
          totalElements: action.payload.totalElements,
          totalPages: action.payload.totalPages,
        };
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch bookings';
      })
      // Fetch Booking By ID
      .addCase(fetchBookingById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookingById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBooking = action.payload;
      })
      .addCase(fetchBookingById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch booking';
      })
      // Create Booking
      .addCase(createBooking.fulfilled, (state, action) => {
        state.bookings = [action.payload, ...state.bookings];
        state.pagination.totalElements += 1;
      })
      // Update Booking
      .addCase(updateBooking.fulfilled, (state, action) => {
        const index = state.bookings.findIndex((b) => b.id === action.payload.id);
        if (index !== -1) {
          state.bookings[index] = action.payload;
        }
        if (state.selectedBooking?.id === action.payload.id) {
          state.selectedBooking = action.payload;
        }
      })
      // Cancel Booking
      .addCase(cancelBooking.fulfilled, (state, action) => {
        const index = state.bookings.findIndex((b) => b.id === action.payload);
        if (index !== -1) {
          state.bookings[index].status = 'CANCELLED';
        }
        if (state.selectedBooking?.id === action.payload) {
          state.selectedBooking = { ...state.selectedBooking, status: 'CANCELLED' };
        }
      });
  },
});

export const { clearSelectedBooking, clearError } = bookingSlice.actions;
export default bookingSlice.reducer;