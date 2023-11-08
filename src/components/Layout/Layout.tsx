import React, { type FC } from 'react';
import { Outlet } from 'react-router-dom';
import Loader from '@components/common/Loader/Loader';
import SearchBar from '@components/SearchBar/SearchBar';
import { useLoadingStatusContext } from '@components/context/LoadingStatusContext/LoadingStatusContext';

const Layout: FC = () => {
  const { isLoading } = useLoadingStatusContext();

  return (
    <div className={'wrapper'}>
      {isLoading && <Loader />}
      <SearchBar />
      <Outlet />
    </div>
  );
};

export default Layout;
