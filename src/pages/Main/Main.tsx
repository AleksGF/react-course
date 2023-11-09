import React, { type FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import NavBar from '@components/NavBar/NavBar';
import PersonDetails from '@components/PersonDetails/PersonDetails';
import { getNumberFromSearchParams } from '@helpers/getNumberFromSearchParams';

const Main: FC = () => {
  const [searchParams] = useSearchParams();
  const detailsId = getNumberFromSearchParams(searchParams, 'details', 0);
  const isDetailsActive = !!(detailsId && detailsId > 0);

  return (
    <main className={'content-wrapper'}>
      <NavBar />
      {isDetailsActive && <PersonDetails />}
    </main>
  );
};

export default Main;
