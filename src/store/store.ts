import { configureStore } from '@reduxjs/toolkit';
import { appSlice } from './appSlice';
import { mainSlice } from './mainSlice';
import { apiClient } from '@src/services/api/apiClient';

const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    main: mainSlice.reducer,
    [apiClient.reducerPath]: apiClient.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiClient.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
