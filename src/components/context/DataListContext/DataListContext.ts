import { createContext } from 'react';
import { getUseContextHook } from '@helpers/getUseContextHook';
import type { Person } from '@/types/apiTypes';

interface DataListContextInterface {
  people: Person[];
  setPeople: (newPeople: Person[]) => void;
  totalPeopleCount: number;
  setTotalPeopleCount: (newValue: number) => void;
}

export const DataListContext = createContext<DataListContextInterface | null>(
  null,
);

export const useDataListContext =
  getUseContextHook<DataListContextInterface>(DataListContext);
