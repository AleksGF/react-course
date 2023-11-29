import type { RouteObject } from 'react-router';
import Layout from '@/components/Layout/Layout';
import Home from '@/pages/Home/Home';
import UncontrolledForm from '@/pages/UncontrolledForm/UncontrolledForm';
import ControlledForm from '@/pages/ControlledForm/ControlledForm';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
        handle: {
          navName: () => 'Home',
          navPath: () => '/',
        },
      },
      {
        path: 'uncontrolled_form',
        element: <UncontrolledForm />,
        handle: {
          navName: () => 'Form without control',
          navPath: () => 'uncontrolled_form/',
        },
      },
      {
        path: 'controlled_form',
        element: <ControlledForm />,
        handle: {
          navName: () => 'Form with control',
          navPath: () => 'controlled_form/',
        },
      },
    ],
    errorElement: <div>Error</div>,
  },
  {
    path: '*',
    element: <div>Not Found</div>,
  },
];
