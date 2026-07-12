import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark' | 'system';
  isMobileMenuOpen: boolean;
  isLoading: boolean;
  activeModal: string | null;
}

const initialState: UIState = {
  sidebarCollapsed: localStorage.getItem('sidebar-collapsed') === 'true',
  theme: (localStorage.getItem('theme') as 'light' | 'dark' | 'system') || 'system',
  isMobileMenuOpen: false,
  isLoading: false,
  activeModal: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
      localStorage.setItem('sidebar-collapsed', String(state.sidebarCollapsed));
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload;
      localStorage.setItem('sidebar-collapsed', String(action.payload));
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
      // Apply theme to document
      if (action.payload === 'system') {
        document.documentElement.className = '';
      } else {
        document.documentElement.className = action.payload;
      }
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isMobileMenuOpen = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setActiveModal: (state, action: PayloadAction<string | null>) => {
      state.activeModal = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarCollapsed,
  setTheme,
  toggleMobileMenu,
  setMobileMenuOpen,
  setLoading,
  setActiveModal,
} = uiSlice.actions;

export default uiSlice.reducer;