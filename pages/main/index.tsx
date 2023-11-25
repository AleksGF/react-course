import React, { type FC } from 'react';
import Head from 'next/head';
import type { GetServerSideProps } from 'next';
import SearchBar from '@components/SearchBar/SearchBar';
import Select from '@components/Select/Select';
import ItemsList from '@components/ItemsList/ItemsList';
import PersonDetails from '@components/PersonDetails/PersonDetails';
import { getValidParams } from '@src/helpers/getValidParams';
import { getApiPageNumber } from '@src/helpers/getApiPageNumber';
import { fetchPeople } from '@src/services/fetchPeople';
import { fetchDetails } from '@src/services/fetchDetails';
import type { PeopleApiResponse, Person } from '@src/types/apiTypes';

interface MainProps {
  people: PeopleApiResponse;
  details?: Person;
}

const Main: FC<MainProps> = ({ people: { count, results }, details }) => {
  return (
    <>
      <Head>
        <title>RSSchool React Course Project</title>
      </Head>
      <header>
        <SearchBar />
      </header>
      <main>
        <h1 className={'nav__title'}>Star War Persons</h1>
        <Select
          wrapperClassName={'select__wrapper'}
          title={'Persons per page:'}
          selectName={'persons-per-page'}
        />
        <ItemsList count={count} data={results} />
      </main>
      {!!details && <PersonDetails person={details} />}
    </>
  );
};

export const getServerSideProps = (async (context) => {
  const {
    search,
    page: pageNumberFromQuery,
    itemsPerPage,
    details: detailsIdFromQuery,
  } = getValidParams(context.query);

  const page = getApiPageNumber(pageNumberFromQuery, itemsPerPage);

  const people = await fetchPeople(search, page, itemsPerPage);

  if (!detailsIdFromQuery) return { props: { people } };

  const details = await fetchDetails(detailsIdFromQuery);

  return { props: { people, details } };
}) satisfies GetServerSideProps<MainProps>;

export default Main;
