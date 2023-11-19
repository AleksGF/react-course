import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  isInitialized: boolean;
  isLoading: boolean;
  isDetailsLoading: boolean;
}

const initialState: AppState = {
  isInitialized: false,
  isLoading: false,
  isDetailsLoading: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setInitializationStatus: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isInitialized: action.payload,
    }),
    setLoadingStatus: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isLoading: action.payload,
    }),
    setDetailsLoadingStatus: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isDetailsLoading: action.payload,
    }),
  },
});

export const {
  setInitializationStatus,
  setLoadingStatus,
  setDetailsLoadingStatus,
} = appSlice.actions;

export default appSlice.reducer;
