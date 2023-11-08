import React, { type FC, useCallback, useState } from 'react';
import { DataListContext } from '@components/context/DataListContext/DataListContext';
import type { Person } from '@types/apiTypes';

interface DataListContextProviderProps {
  children: React.ReactNode;
}

const DataListContextProvider: FC<DataListContextProviderProps> = ({
  children,
}) => {
  const [people, setPeople] = useState<Person[]>([]);

  return (
    <DataListContext.Provider
      value={{
        people,
        setPeople: useCallback(
          (newPeople: Person[]) => {
            setPeople(newPeople);
          },
          [setPeople],
        ),
      }}
    >
      {children}
    </DataListContext.Provider>
  );
};

export default DataListContextProvider;
