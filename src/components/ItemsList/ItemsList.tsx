import React, { type FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@src/hook/hook';
import { useSearchParams } from 'react-router-dom';
import { getNumberFromSearchParams } from '@src/helpers/getNumberFromSearchParams';
import { FIRST_PAGE } from '@src/constants/constants';
import { useGetPeopleQuery } from '@src/services/api/apiClient';
import { setLoadingStatus } from '@src/store/appSlice';
import { PeopleApiResponse } from '@src/types/apiTypes';
import Item from '@components/ItemsList/Item/Item';
import Paginate from '@components/common/Paginate/Paginate';

const ItemsList: FC = () => {
  const dispatch = useAppDispatch();

  const { isInitialized } = useAppSelector((state) => state.app);
  const { searchValue, itemsPerPage } = useAppSelector((state) => state.main);

  const [searchParams] = useSearchParams();
  const pageFromURL = getNumberFromSearchParams(
    searchParams,
    'page',
    FIRST_PAGE,
  );
  const pageNumber =
    pageFromURL && pageFromURL >= FIRST_PAGE ? pageFromURL : FIRST_PAGE;

  const { data, isLoading } = useGetPeopleQuery(
    { searchValue, pageNumber },
    { skip: !isInitialized },
  ) as { data?: PeopleApiResponse; isLoading: boolean };

  useEffect(() => {
    dispatch(setLoadingStatus(isLoading));
  }, [dispatch, isLoading]);

  if (!data || !data.results?.length) {
    return <h2 className={'nav__title'}>No one was found</h2>;
  }

  return (
    <>
      <h2 className={'nav__title'}>Star War Persons</h2>
      {data.results.map((person) => (
        <Item
          key={`${person.name}-${person.url}-${person.created}`}
          person={person}
        />
      ))}
      <Paginate
        pageNumber={pageNumber ? pageNumber - 1 : 0}
        totalItemsCount={data.count}
        itemsPerPage={itemsPerPage}
      />
    </>
  );
};

export default ItemsList;
