import React, { type FC, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSearchContext } from '@components/context/SearchContext/SearchContext';
import { fetchPeople } from '@services/api/fetchPeople';
import { getExtendedSearchParams } from '@helpers/getExtendedSearchParams';
import NavBar from '@components/NavBar/NavBar';
import PersonDetails from '@components/PersonDetails/PersonDetails';
import type { Person } from '@types/apiTypes';

interface MainProps {
  shouldUpdateData: boolean;
  setIsLoading: (value: ((prevState: boolean) => boolean) | boolean) => void;
  setShouldUpdateData: (
    value: ((prevState: boolean) => boolean) | boolean,
  ) => void;
}

const Main: FC<MainProps> = (props) => {
  const { shouldUpdateData, setIsLoading, setShouldUpdateData } = props;
  const { searchValue } = useSearchContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [peopleToShow, setPeopleToShow] = useState<Person[]>([]);
  const totalPeopleCount = useRef(0);

  const isDetailsActive = Boolean(searchParams.get('details'));

  useEffect(() => {
    const pageFromSearchParams = searchParams.get('page');

    if (!pageFromSearchParams) {
      setSearchParams(getExtendedSearchParams(searchParams, { page: '1' }));
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    if (shouldUpdateData) {
      const currentPage = Number(searchParams.get('page') ?? '1');
      const personsPerPage = Number(searchParams.get('limit') ?? '10');

      setIsLoading(true);

      fetchPeople(currentPage, personsPerPage === 20 ? personsPerPage : 10, {
        searchValue,
      }).then((data) => {
        setPeopleToShow(data.people);
        totalPeopleCount.current = data.totalCount;
        setIsLoading(false);
      });

      setShouldUpdateData(false);
    }
  }, [
    shouldUpdateData,
    searchValue,
    searchParams,
    setIsLoading,
    setShouldUpdateData,
  ]);

  return (
    <main className={'content-wrapper'}>
      <NavBar
        people={peopleToShow}
        totalPeopleCount={totalPeopleCount}
        setShouldUpdateData={setShouldUpdateData}
      />
      {isDetailsActive && <PersonDetails />}
    </main>
  );
};

export default Main;
