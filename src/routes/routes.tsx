import React from 'react';
import { RouteObject } from 'react-router';
import Layout from '@components/Layout/Layout';
import Main from '@pages/Main/Main';
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary';
import NotFound from '@pages/NotFound/NotFound';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
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
