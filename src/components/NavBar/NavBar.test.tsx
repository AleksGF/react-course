import React from 'react';
import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { customRender } from '@src/test/providers/customRender';
import { server } from '@src/test/__mocks__/mockServer';
import NavBar from '@components/NavBar/NavBar';
import { stateWithInitialization } from '@src/test/__mocks__/mockStore';
import {
  PageNumber,
  personsFromFirstPage,
  totalApiPeopleCount,
} from '@src/test/__mocks__/mockApiData';
import { ITEMS_PER_PAGE } from '@src/constants/constants';

const router = createMemoryRouter(
  [
    {
      path: '/',
      element: <NavBar />,
    },
  ],
  {
    initialEntries: ['/'],
  },
);

const TestComponent = () => <RouterProvider router={router} />;

describe('NavBar should render correctly', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());

  test('It should show "No one was found" when no data', () => {
    const { getByText } = customRender(<TestComponent />, {
      preloadedState: stateWithInitialization,
    });

    expect(getByText('No one was found')).toBeInTheDocument();
  });

  test('It should render list of persons after data received', async () => {
    const { getByText } = customRender(<TestComponent />, {
      preloadedState: stateWithInitialization,
    });

    await waitFor(() => {
      expect(getByText(personsFromFirstPage[0])).toBeInTheDocument();
      expect(getByText(personsFromFirstPage[7])).toBeInTheDocument();
    });
  });

  test('It should render select element', () => {
    const { getByText, getByRole } = customRender(<TestComponent />, {
      preloadedState: stateWithInitialization,
    });

    expect(getByText('Persons per page:')).toBeInTheDocument();
    expect(getByRole('combobox')).toBeInTheDocument();
  });

  test('It should render paginate element after data received', async () => {
    const { getByText, queryByText } = customRender(<TestComponent />, {
      preloadedState: stateWithInitialization,
    });

    await waitFor(() => {
      expect(getByText(String(PageNumber.FirstPageNumber))).toBeInTheDocument();
      expect(
        getByText(String(PageNumber.SecondPageNumber)),
      ).toBeInTheDocument();
      expect(getByText(String(PageNumber.ThirdPageNumber))).toBeInTheDocument();
      expect(
        getByText(
          String(Math.ceil(totalApiPeopleCount / ITEMS_PER_PAGE.DEFAULT)),
        ),
      ).toBeInTheDocument();
      expect(
        queryByText(
          String(Math.ceil(totalApiPeopleCount / ITEMS_PER_PAGE.DEFAULT) + 2),
        ),
      ).toBeNull();
    });
  });

  test('It should render paginate element with double items per page', async () => {
    const { getByText, queryByText } = customRender(<TestComponent />, {
      preloadedState: {
        ...stateWithInitialization,
        main: {
          ...stateWithInitialization.main,
          itemsPerPage: ITEMS_PER_PAGE.DOUBLE,
        },
      },
    });

    await waitFor(() => {
      expect(getByText(String(PageNumber.FirstPageNumber))).toBeInTheDocument();
      expect(getByText(String(PageNumber.ThirdPageNumber))).toBeInTheDocument();
      expect(
        getByText(
          String(Math.ceil(totalApiPeopleCount / ITEMS_PER_PAGE.DOUBLE)),
        ),
      ).toBeInTheDocument();
      expect(
        queryByText(
          String(Math.ceil(totalApiPeopleCount / ITEMS_PER_PAGE.DOUBLE) + 1),
        ),
      ).toBeNull();
    });
  });
});
