import React, { type FC } from 'react';
import { useAppSelector } from '@src/hook/hook';
import NavBar from '@components/NavBar/NavBar';
import PersonDetails from '@components/PersonDetails/PersonDetails';

const Main: FC = () => {
  const { detailsView } = useAppSelector((state) => state.main);

  return (
    <main className={'content-wrapper'}>
      <NavBar />
      {!!detailsView && <PersonDetails personId={detailsView} />}
    </main>
  );
};

export default Main;
