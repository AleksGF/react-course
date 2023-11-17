import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  isInitialized: boolean;
  isLoading: boolean;
}

const initialState: AppState = {
  isInitialized: false,
  isLoading: false,
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
  },
});

export const { setInitializationStatus, setLoadingStatus } = appSlice.actions;

export default appSlice.reducer;
