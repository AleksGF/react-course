import { createContext } from 'react';
import { getUseContextHook } from '@helpers/getUseContextHook';

export type SearchValue = string;

export interface SearchContextInterface {
  searchValue: SearchValue;
  setSearchValue: (value: string) => void;
}

export const SearchContext = createContext<SearchContextInterface | null>(null);

export const useSearchContext =
  getUseContextHook<SearchContextInterface>(SearchContext);
