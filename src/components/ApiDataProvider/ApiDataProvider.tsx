import React, { type FC, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchPeople } from '@services/api/fetchPeople';
import { getNumberFromSearchParams } from '@helpers/getNumberFromSearchParams';
import { useSearchContext } from '@components/context/SearchContext/SearchContext';
import { useLoadingStatusContext } from '@components/context/LoadingStatusContext/LoadingStatusContext';
import { useDataListContext } from '@components/context/DataListContext/DataListContext';
import { FIRST_PAGE, ITEMS_PER_PAGE } from '@constants/constants';

interface ApiDataProviderProps {
  children: React.ReactNode;
}

const ApiDataProvider: FC<ApiDataProviderProps> = ({ children }) => {
  const { searchValue } = useSearchContext();
  const { setPeople, setTotalPeopleCount } = useDataListContext();
  const { setIsLoading } = useLoadingStatusContext();

  const prevSearchValue = useRef<string | null>(null);
  const prevPageNumber = useRef<number | null>(null);
  const prevPersonsPerPage = useRef<number | null>(null);

  const [searchParams] = useSearchParams();

  const pageFromURL = getNumberFromSearchParams(
    searchParams,
    'page',
    FIRST_PAGE,
  );

  const page = pageFromURL && pageFromURL > 0 ? pageFromURL : FIRST_PAGE;

  const personsPerPageFromURL = getNumberFromSearchParams(
    searchParams,
    'limit',
    ITEMS_PER_PAGE.DEFAULT,
  );

  const personsPerPage =
    personsPerPageFromURL === ITEMS_PER_PAGE.DOUBLE
      ? ITEMS_PER_PAGE.DOUBLE
      : ITEMS_PER_PAGE.DEFAULT;

  useEffect(() => {
    if (
      searchValue !== prevSearchValue.current ||
      page !== prevPageNumber.current ||
      personsPerPage !== prevPersonsPerPage.current
    ) {
      setIsLoading(true);

      fetchPeople(page, personsPerPage, searchValue)
        .then((data) => {
          setPeople(data.people);
          setTotalPeopleCount(data.totalCount);

          prevSearchValue.current = searchValue;
          prevPageNumber.current = page;
          prevPersonsPerPage.current = personsPerPage;
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [
    searchValue,
    page,
    personsPerPage,
    setIsLoading,
    setPeople,
    setTotalPeopleCount,
  ]);

  return <>{children}</>;
};

export default ApiDataProvider;
