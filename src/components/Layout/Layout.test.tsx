import React from 'react';
import '@testing-library/jest-dom';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { customRender } from '@src/test/providers/customRender';
import Layout from '@src/components/Layout/Layout';
import { stateWithInitialization } from '@src/test/__mocks__/mockStore';

const router = createMemoryRouter(
  [
    {
      path: '/',
      element: <Layout />,
    },
  ],
  {
    initialEntries: ['/'],
  },
);

const TestComponent = () => <RouterProvider router={router} />;

describe('Layout should render correctly', () => {
  test('it should render Loader when isLoading = true', () => {
    const { getByTestId, getByText } = customRender(<TestComponent />, {
      preloadedState: {
        ...stateWithInitialization,
        app: { ...stateWithInitialization.app, isLoading: true },
      },
    });

    expect(getByTestId('circle')).toBeInTheDocument();
    expect(getByText('Search')).toBeInTheDocument();
  });

  test('it should not render Loader when isLoading = false', () => {
    const { queryByTestId, getByText } = customRender(<TestComponent />, {
      preloadedState: stateWithInitialization,
    });

    expect(queryByTestId('circle')).toBeNull();
    expect(getByText('Search')).toBeInTheDocument();
  });
});
