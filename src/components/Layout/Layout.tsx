import React, { type FC } from 'react';
import { Outlet } from 'react-router-dom';
import Loader from '@components/common/Loader/Loader';
import SearchBar from '@components/SearchBar/SearchBar';
import type { LayoutProps } from '@types/types';

const Layout: FC<LayoutProps> = (props) => {
  const { isLoading, searchValue, setSearchValue, setShouldUpdateData } = props;

  return (
    <div className={'wrapper'}>
      {isLoading && <Loader />}
      <SearchBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setShouldUpdateData={setShouldUpdateData}
      />
      <Outlet />
    </div>
  );
};

export default Layout;
