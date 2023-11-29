import React, { type FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from '@/constants/routes';
import '@/logo.svg';

const router = createBrowserRouter(routes);

const App: FC = () => <RouterProvider router={router} />;

export default App;
