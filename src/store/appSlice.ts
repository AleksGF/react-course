import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface NavPaths {
  name: string;
  path: string;
}

interface AppState {
  navPaths: NavPaths[];
}

const initialState: AppState = {
  navPaths: [],
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
