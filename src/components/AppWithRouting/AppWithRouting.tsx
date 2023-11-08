import React, { useState, type FC, useEffect, PropsWithChildren } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { type RouteObject } from 'react-router';
import Layout from '@/components/Layout/Layout';
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary';
import Main from '@pages/Main/Main';

const AppWithRouting: FC<PropsWithChildren> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [shouldUpdateData, setShouldUpdateData] = useState<boolean>(false);

  useEffect(() => {
    if (searchValue === null) {
      setSearchValue(localStorage.getItem('rc_lastSearch') ?? '');
      setShouldUpdateData(true);
    }
  }, [searchValue]);

  const routes: RouteObject[] = [
    {
      path: '/',
      element: (
        <Layout
          isLoading={isLoading}
          searchValue={searchValue || ''}
          setSearchValue={setSearchValue}
          setShouldUpdateData={setShouldUpdateData}
        />
      ),
      children: [
        {
          index: true,
          element: (
            <Main
              searchValue={searchValue || ''}
              shouldUpdateData={shouldUpdateData}
              setIsLoading={setIsLoading}
              setSearchValue={setSearchValue}
              setShouldUpdateData={setShouldUpdateData}
            />
          ),
        },
      ],
      errorElement: <ErrorBoundary />,
    },
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router}>{children}</RouterProvider>;
};

export default AppWithRouting;
