import React, { type FC } from 'react';
import { Outlet } from 'react-router-dom';
import Loader from '@components/common/Loader/Loader';
import SearchBar from '@components/SearchBar/SearchBar';
import { useAppSelector } from '@src/hook/hook';

const Layout: FC = () => {
  const { isLoading } = useAppSelector((state) => state.app);

  return (
    <div className={'wrapper'}>
      {isLoading && <Loader />}
      <SearchBar />
      <Outlet />
    </div>
  );
};

export default Layout;
