import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import {
  render,
  type RenderOptions,
  type Queries,
  type RenderResult,
} from '@testing-library/react';
import {
  SearchContext,
  type SearchContextInterface,
} from '@components/context/SearchContext/SearchContext';
import {
  DataListContext,
  type DataListContextInterface,
} from '@components/context/DataListContext/DataListContext';
import {
  LoadingStatusContext,
  type LoadingStatusContextInterface,
} from '@components/context/LoadingStatusContext/LoadingStatusContext';

interface ContextsProps {
  searchContextProps: SearchContextInterface;
  dataListContextProps: DataListContextInterface;
  loadingStatusContextProps: LoadingStatusContextInterface;
}

interface CustomRenderProps
  extends RenderOptions<Queries, HTMLElement, HTMLElement> {
  contextsProps: ContextsProps;
  route: string;
}

export const customRender = (
  ui: React.ReactElement,
  { contextsProps, route, ...renderOptions }: CustomRenderProps,
): RenderResult<Queries, HTMLElement, HTMLElement> => {
  window.history.pushState({}, 'Test page', route);

  return render(
    <SearchContext.Provider value={contextsProps.searchContextProps}>
      <LoadingStatusContext.Provider
        value={contextsProps.loadingStatusContextProps}
      >
        <DataListContext.Provider value={contextsProps.dataListContextProps}>
          {ui}
        </DataListContext.Provider>
      </LoadingStatusContext.Provider>
    </SearchContext.Provider>,
    { ...renderOptions, wrapper: BrowserRouter },
  );
};
