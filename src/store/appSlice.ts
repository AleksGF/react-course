import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { COUNTRIES } from '@/constants/countries';

export interface NavPaths {
  name: string;
  path: string;
}

interface AppState {
  navPaths: NavPaths[];
  countries: string[];
}

const initialState: AppState = {
  navPaths: [],
  countries: COUNTRIES,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setNavPaths: (state, action: PayloadAction<NavPaths[]>) => ({
      ...state,
      navPaths: action.payload,
    }),
  },
});

export const { setNavPaths } = appSlice.actions;

export default appSlice.reducer;
