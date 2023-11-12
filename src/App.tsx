import React, { type FC } from 'react';
import DataListContextProvider from '@components/context/DataListContext/DataListContextProvider';
import LoadingStatusContextProvider from '@components/context/LoadingStatusContext/LoadingStatusContextProvider';
import SearchContextProvider from '@components/context/SearchContext/SearchContextProvider';
import AppWithRouting from '@components/AppWithRouting/AppWithRouting';
import '@/App.scss';

const App: FC = () => {
  return (
    <SearchContextProvider>
      <DataListContextProvider>
        <LoadingStatusContextProvider>
          <AppWithRouting />
        </LoadingStatusContextProvider>
      </DataListContextProvider>
    </SearchContextProvider>
  );
};

export default App;
