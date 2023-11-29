import React, { type FC } from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router';
import Header from '@/components/Header/Header';

const Main = styled.main`
  padding: 2rem 1rem;
`;

const Layout: FC = () => {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </>
  );
};

export default Layout;
