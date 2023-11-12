import React, { type FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from '@components/AppWithRouting/routes';

const router = createBrowserRouter(routes);

const AppWithRouting: FC = () => {
  return <RouterProvider router={router} />;
};

export default AppWithRouting;
