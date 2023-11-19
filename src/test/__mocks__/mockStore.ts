import type { PreloadedState } from '@reduxjs/toolkit';
import type { RootState } from '@src/store/store';

export const initialState: PreloadedState<RootState> = {
  app: {
    isInitialized: false,
    isLoading: false,
    isDetailsLoading: false,
  },
  main: {
    searchValue: '',
    itemsPerPage: 10,
    detailsView: null,
  },
  api: {
    queries: {},
    mutations: {},
    provided: {},
    subscriptions: {},
    config: {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: false,
      refetchOnFocus: false,
      reducerPath: 'api',
      online: true,
      focused: false,
      middlewareRegistered: true,
      keepUnusedDataFor: 60,
    },
  },
};

export const stateWithInitialization: PreloadedState<RootState> = {
  ...initialState,
  app: {
    isInitialized: true,
    isLoading: false,
    isDetailsLoading: false,
  },
};
