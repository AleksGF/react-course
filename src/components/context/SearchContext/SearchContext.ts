import React, { createContext, useContext } from 'react';

export type SearchValue = string;

interface SearchContextInterface {
  searchValue: SearchValue;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchContext = createContext<SearchContextInterface | null>(null);

export const useSearchContext = (): SearchContextInterface => {
  const context = useContext(SearchContext);

  if (context === null) {
    throw new Error('Context was not provided');
  }

  return context;
};
