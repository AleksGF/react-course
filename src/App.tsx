import React, { type FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from '@src/routes/routes';
import '@src/App.scss';
import { useAppDispatch } from '@src/hook/hook';
import { setInitializationStatus } from '@src/store/appSlice';

const router = createBrowserRouter(routes);

const App: FC = () => {
  const dispatch = useAppDispatch();

  dispatch(setInitializationStatus(true));

  return <RouterProvider router={router} />;
};

export default App;
