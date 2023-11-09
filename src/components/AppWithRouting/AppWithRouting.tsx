import React, { type FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { type RouteObject } from 'react-router';
import ApiDataProvider from '@components/ApiDataProvider/ApiDataProvider';
import Layout from '@/components/Layout/Layout';
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary';
import Main from '@pages/Main/Main';

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <ApiDataProvider>
        <Layout />
      </ApiDataProvider>
    ),
    children: [
      {
        index: true,
        element: <Main />,
      },
    ],
    errorElement: <ErrorBoundary />,
  },
];

const router = createBrowserRouter(routes);

const AppWithRouting: FC = () => {
  return <RouterProvider router={router} />;
};

export default AppWithRouting;
