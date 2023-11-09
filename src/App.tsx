import React, { type FC } from 'react';
import AppWithRouting from '@components/AppWithRouting/AppWithRouting';
import SearchContextProvider from '@components/context/SearchContext/SearchContextProvider';
import DataListContextProvider from '@components/context/DataListContext/DataListContextProvider';
import LoadingStatusContextProvider from '@components/context/LoadingStatusContext/LoadingStatusContextProvider';
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
