import React, { createContext } from 'react';
import { getUseContextHook } from '@helpers/getUseContextHook';
import type { Person } from '@types/apiTypes';

interface DataListContextInterface {
  people: Person[];
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>;
  totalPeopleCount: number;
  setTotalPeopleCount: React.Dispatch<React.SetStateAction<number>>;
}

export const DataListContext = createContext<DataListContextInterface | null>(
  null,
);

export const useDataListContext =
  getUseContextHook<DataListContextInterface>(DataListContext);
