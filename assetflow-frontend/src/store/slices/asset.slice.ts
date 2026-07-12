import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { assetApi } from '@/api/asset.api';
import { Asset, PaginatedResponse } from '@/types';

interface AssetState {
  assets: Asset[];
  selectedAsset: Asset | null;
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}

const initialState: AssetState = {
  assets: [],
  selectedAsset: null,
  loading: false,
  error: null,
  pagination: {
    page: 0,
    size: 10,
    totalElements: 0,
    totalPages: 0,
  },
};

export const fetchAssets = createAsyncThunk(
  'assets/fetchAssets',
  async (params: {
    search?: string;
    categoryId?: string;
    status?: string;
    page?: number;
    size?: number;
  }) => {
    const response = await assetApi.getAssets(params);
    return response.data.data;
  }
);

export const fetchAssetById = createAsyncThunk(
  'assets/fetchAssetById',
  async (id: string) => {
    const response = await assetApi.getAssetById(id);
    return response.data.data;
  }
);

export const createAsset = createAsyncThunk(
  'assets/createAsset',
  async (data: Partial<Asset>) => {
    const response = await assetApi.createAsset(data);
    return response.data.data;
  }
);

export const updateAsset = createAsyncThunk(
  'assets/updateAsset',
  async ({ id, data }: { id: string; data: Partial<Asset> }) => {
    const response = await assetApi.updateAsset(id, data);
    return response.data.data;
  }
);

export const deleteAsset = createAsyncThunk(
  'assets/deleteAsset',
  async (id: string) => {
    await assetApi.deleteAsset(id);
    return id;
  }
);

const assetSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    clearSelectedAsset: (state) => {
      state.selectedAsset = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Assets
      .addCase(fetchAssets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssets.fulfilled, (state, action) => {
        state.loading = false;
        state.assets = action.payload.content;
        state.pagination = {
          page: action.payload.page,
          size: action.payload.size,
          totalElements: action.payload.totalElements,
          totalPages: action.payload.totalPages,
        };
      })
      .addCase(fetchAssets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch assets';
      })
      // Fetch Asset By ID
      .addCase(fetchAssetById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssetById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedAsset = action.payload;
      })
      .addCase(fetchAssetById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch asset';
      })
      // Create Asset
      .addCase(createAsset.fulfilled, (state, action) => {
        state.assets = [action.payload, ...state.assets];
        state.pagination.totalElements += 1;
      })
      // Update Asset
      .addCase(updateAsset.fulfilled, (state, action) => {
        const index = state.assets.findIndex((a) => a.id === action.payload.id);
        if (index !== -1) {
          state.assets[index] = action.payload;
        }
        if (state.selectedAsset?.id === action.payload.id) {
          state.selectedAsset = action.payload;
        }
      })
      // Delete Asset
      .addCase(deleteAsset.fulfilled, (state, action) => {
        state.assets = state.assets.filter((a) => a.id !== action.payload);
        state.pagination.totalElements -= 1;
        if (state.selectedAsset?.id === action.payload) {
          state.selectedAsset = null;
        }
      });
  },
});

export const { clearSelectedAsset, clearError } = assetSlice.actions;
export default assetSlice.reducer;