import React, { type FC, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchPeople } from '@services/api/fetchPeople';
import { getExtendedSearchParams } from '@helpers/getExtendedSearchParams';
import NavBar from '@components/NavBar/NavBar';
import PersonDetails from '@components/PersonDetails/PersonDetails';
import type { MainProps } from '@types/types';
import type { Person } from '@types/apiTypes';

const Main: FC<MainProps> = (props) => {
  const {
    searchValue,
    shouldUpdateData,
    setIsLoading,
    setSearchValue,
    setShouldUpdateData,
  } = props;
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
    if (shouldUpdateData && (searchValue || searchValue === '')) {
      const search = searchValue.trim();
      localStorage.setItem('rc_lastSearch', search);
      const currentPage = Number(searchParams.get('page') ?? '1');
      const personsPerPage = Number(searchParams.get('limit') ?? '10');

      setIsLoading(true);

      fetchPeople(currentPage, personsPerPage === 20 ? personsPerPage : 10, {
        search,
      }).then((data) => {
        setPeopleToShow(data.people);
        totalPeopleCount.current = data.totalCount;
        setSearchValue(search);
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
    setSearchValue,
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
