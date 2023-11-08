import React, { type FC } from 'react';
import AppWithRouting from '@components/AppWithRouting/AppWithRouting';
import SearchContextProvider from '@components/context/SearchContext/SearchContextProvider';
import '@/App.scss';

const App: FC = () => {
  return (
    <SearchContextProvider>
      <AppWithRouting />
    </SearchContextProvider>
  );
};

export default App;
