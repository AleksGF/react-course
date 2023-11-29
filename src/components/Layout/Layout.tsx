import React, { type FC } from 'react';
import { Outlet } from 'react-router';
import Header from '@/components/Header/Header';

const Layout: FC = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
