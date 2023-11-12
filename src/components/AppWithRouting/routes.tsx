import React from 'react';
import { RouteObject } from 'react-router';
import ApiDataProvider from '@components/ApiDataProvider/ApiDataProvider';
import Layout from '@components/Layout/Layout';
import Main from '@pages/Main/Main';
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary';
import NotFound from '@pages/NotFound/NotFound';

export const routes: RouteObject[] = [
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
  {
    path: '*',
    element: <NotFound />,
  },
];
