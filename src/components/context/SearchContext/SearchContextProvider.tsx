import React, { type FC, useState, useCallback, useEffect } from 'react';
import {
  SearchContext,
  type SearchValue,
} from '@components/context/SearchContext/SearchContext';

interface SearchContextProviderProps {
  children: React.ReactNode;
}

const SearchContextProvider: FC<SearchContextProviderProps> = ({
  children,
}) => {
  const [searchValue, setSearchValue] = useState<SearchValue>('');

  useEffect(() => {
    const savedValue = localStorage.getItem('rc_lastSearch');

    if (savedValue) setSearchValue(savedValue);
  }, []);

  return (
    <SearchContext.Provider
      value={{
        searchValue,
        setSearchValue: useCallback(
          (value: string) => {
            setSearchValue(value);
          },
          [setSearchValue],
        ),
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
