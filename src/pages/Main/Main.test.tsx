import React from 'react';
import '@testing-library/jest-dom';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { waitFor } from '@testing-library/react';
import { customRender } from '@src/test/providers/customRender';
import { server } from '@src/test/__mocks__/mockServer';
import Main from '@pages/Main/Main';
import { stateWithInitialization } from '@src/test/__mocks__/mockStore';

const router = createMemoryRouter(
  [
    {
      path: '/',
      element: <Main />,
    },
  ],
  {
    initialEntries: ['/'],
  },
);

const TestComponent = () => <RouterProvider router={router} />;

describe('Main page should render correctly', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('it should not render details when search param not provided', () => {
    const { getByText, queryByText, queryByTestId } = customRender(
      <TestComponent />,
      {
        preloadedState: stateWithInitialization,
      },
    );

    expect(getByText('No one was found')).toBeInTheDocument();
    expect(queryByText('Person Details:')).toBeNull();
    expect(queryByTestId('circle')).toBeNull();
  });

  test('it should render details block when personId  provided in detailsView', async () => {
    const { getByText, queryByText, getByTestId } = customRender(
      <TestComponent />,
      {
        preloadedState: {
          ...stateWithInitialization,
          main: { ...stateWithInitialization.main, detailsView: 1 },
        },
      },
    );

    expect(getByText('No one was found')).toBeInTheDocument();
    expect(getByTestId('circle')).toBeInTheDocument();
    expect(queryByText('Person Details:')).not.toBeInTheDocument();

    await waitFor(() =>
      expect(getByText('Person Details:')).toBeInTheDocument(),
    );
  });
});
