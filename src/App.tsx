import React, { type FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from '@src/routes/routes';
import { useInit } from '@src/hook/useInit';
import { useSearchParamsHandle } from '@src/hook/useSearchParamsHandle';
import '@src/App.scss';

const router = createBrowserRouter(routes);

const App: FC = () => {
  useInit();
  useSearchParamsHandle();

  return <RouterProvider router={router} />;
};

export default App;
