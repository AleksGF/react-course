import React, { createContext } from 'react';
import { getUseContextHook } from '@helpers/getUseContextHook';

export type SearchValue = string;

interface SearchContextInterface {
  searchValue: SearchValue;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchContext = createContext<SearchContextInterface | null>(null);

export const useSearchContext =
  getUseContextHook<SearchContextInterface>(SearchContext);
