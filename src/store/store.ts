import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import mainReducer from './mainSlice';
import apiReducer, { apiClient } from '@src/services/api/apiClient';

const store = configureStore({
  reducer: {
    app: appReducer,
    main: mainReducer,
    [apiClient.reducerPath]: apiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiClient.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;
