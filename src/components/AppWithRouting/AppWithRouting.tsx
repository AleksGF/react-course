import React, { useState, type FC, type PropsWithChildren } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { type RouteObject } from 'react-router';
import Layout from '@/components/Layout/Layout';
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary';
import Main from '@pages/Main/Main';

const AppWithRouting: FC<PropsWithChildren> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [shouldUpdateData, setShouldUpdateData] = useState<boolean>(false);

  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Layout isLoading={isLoading} />,
      children: [
        {
          index: true,
          element: (
            <Main
              shouldUpdateData={shouldUpdateData}
              setIsLoading={setIsLoading}
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
