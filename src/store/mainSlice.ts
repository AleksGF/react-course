import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ITEMS_PER_PAGE,
  LOCAL_STORAGE_SEARCH_VALUE_KEY,
} from '@src/constants/constants';

interface MainState {
  searchValue: string;
  itemsPerPage: ITEMS_PER_PAGE;
  detailsView: number | null;
}

const initialState: MainState = {
  searchValue: '',
  itemsPerPage: ITEMS_PER_PAGE.DEFAULT,
  detailsView: null,
};

export const getSavedSearchValue = createAsyncThunk(
  'main/getSavedSearchValue',
  (_, { dispatch }) => {
    const savedValue = localStorage.getItem(LOCAL_STORAGE_SEARCH_VALUE_KEY);

    if (savedValue) dispatch(setSearchValue(savedValue));
  },
);

export const saveSearchValue = createAsyncThunk(
  'main/saveSearchValue',
  (value: string, { dispatch }) => {
    const newValue = value.trim();

    localStorage.setItem(LOCAL_STORAGE_SEARCH_VALUE_KEY, newValue);

    dispatch(setSearchValue(newValue));
  },
);

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => ({
      ...state,
      searchValue: action.payload,
    }),
    setItemsPerPage: (state, action: PayloadAction<ITEMS_PER_PAGE>) => ({
      ...state,
      itemsPerPage: action.payload,
    }),
    showPersonDetails: (state, action: PayloadAction<number>) => ({
      ...state,
      detailsView: action.payload,
    }),
    hidePersonDetails: (state) => ({ ...state, detailsView: null }),
  },
});

export const {
  setSearchValue,
  setItemsPerPage,
  showPersonDetails,
  hidePersonDetails,
} = mainSlice.actions;

export default mainSlice.reducer;
