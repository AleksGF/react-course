import React, { type FC } from 'react';
import { Outlet } from 'react-router-dom';
import Loader from '@components/common/Loader/Loader';
import SearchBar from '@components/SearchBar/SearchBar';

interface LayoutProps {
  isLoading: boolean;
}

const Layout: FC<LayoutProps> = (props) => {
  const { isLoading } = props;

  return (
    <div className={'wrapper'}>
      {isLoading && <Loader />}
      <SearchBar />
      <Outlet />
    </div>
  );
};

export default Layout;
