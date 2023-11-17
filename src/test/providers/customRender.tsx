import React, {
  type FC,
  type PropsWithChildren,
  type ReactElement,
} from 'react';
import '@testing-library/jest-dom';
import {
  render,
  type RenderOptions,
  type RenderResult,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';
import appReducer from '@src/store/appSlice';
import mainReducer from '@src/store/mainSlice';
import apiReducer, { apiClient } from '@src/services/api/apiClient';
import { initialState } from '@src/test/__mocks__/mockStore';
import type { RootState, AppStore } from '@src/store/store';

interface CustomRenderProps extends RenderOptions {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

interface RenderResultWithStore extends RenderResult {
  store: AppStore;
}

export const customRender = (
  ui: ReactElement,
  {
    preloadedState = initialState,
    store = configureStore({
      reducer: {
        app: appReducer,
        main: mainReducer,
        api: apiReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiClient.middleware),
      preloadedState,
    }),
    ...renderOptions
  }: CustomRenderProps = {},
): RenderResultWithStore => {
  const Wrapper: FC<PropsWithChildren> = ({ children }): ReactElement => (
    <Provider store={store}>{children}</Provider>
  );

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};
