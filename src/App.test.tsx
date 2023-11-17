import React from 'react';
import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { server } from '@src/test/__mocks__/mockServer';
import { customRender } from '@src/test/providers/customRender';
import App from '@src/App';
import { ITEMS_PER_PAGE } from '@src/constants/constants';
import {
  PageNumber,
  personsFromFirstPage,
  personsFromSecondPage,
  searchPersonName,
} from '@src/test/__mocks__/mockApiData';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { routes } from '@src/routes/routes';

describe('App component should', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());

  const user = userEvent.setup();

  test('render correctly', async () => {
    const { container, getByText, getByRole, getByTestId, queryByText } =
      customRender(<App />);

    expect(getByTestId('circle')).toBeInTheDocument();
    expect(getByRole('textbox')).toBeInTheDocument();
    expect(getByRole('button')).toBeInTheDocument();
    expect(getByText('No one was found')).toBeInTheDocument();
    expect(queryByText('Person Details:')).toBeNull();

    await waitFor(() => expect(queryByText('No one was found')).toBeNull(), {
      container,
      mutationObserverOptions: { childList: true },
    });

    expect(getByText('Star War Persons')).toBeInTheDocument();
  });

  test('handle person details', async () => {
    const { container, getByText, queryByText, getByAltText } = customRender(
      <App />,
    );

    await waitFor(
      () => expect(getByText('Star War Persons')).toBeInTheDocument(),
      {
        container,
        mutationObserverOptions: { childList: true },
      },
    );

    expect(queryByText('Person Details:')).toBeNull();

    await user.click(getByText(personsFromFirstPage[0]));

    await waitFor(
      () => expect(getByText('Person Details:')).toBeInTheDocument(),
      {
        mutationObserverOptions: { childList: true },
      },
    );

    expect(getByAltText('Close details')).toBeInTheDocument();

    await user.click(getByAltText('Close details'));

    await waitFor(() => expect(queryByText('Person Details:')).toBeNull(), {
      mutationObserverOptions: { childList: true },
    });
  });

  test('handle person per page change', async () => {
    const { container, getByRole, queryAllByTestId } = customRender(<App />);

    await waitFor(
      () =>
        expect(queryAllByTestId('person-item')).toHaveLength(
          ITEMS_PER_PAGE.DEFAULT,
        ),
      {
        container,
        mutationObserverOptions: { childList: true },
      },
    );

    await user.selectOptions(
      getByRole('combobox'),
      String(ITEMS_PER_PAGE.DOUBLE),
    );

    await waitFor(
      () =>
        expect(queryAllByTestId('person-item')).toHaveLength(
          ITEMS_PER_PAGE.DOUBLE,
        ),
      {
        container,
        mutationObserverOptions: { childList: true },
      },
    );

    await user.selectOptions(
      getByRole('combobox'),
      String(ITEMS_PER_PAGE.DEFAULT),
    );

    await waitFor(
      () =>
        expect(queryAllByTestId('person-item')).toHaveLength(
          ITEMS_PER_PAGE.DEFAULT,
        ),
      {
        container,
        mutationObserverOptions: { childList: true },
      },
    );
  });

  test('handle page change', async () => {
    const { container, getByText, queryByText } = customRender(<App />);

    await waitFor(
      () =>
        expect(
          getByText(String(PageNumber.SecondPageNumber)),
        ).toBeInTheDocument(),
      {
        container,
        mutationObserverOptions: { childList: true },
      },
    );

    expect(getByText(personsFromFirstPage[0])).toBeInTheDocument();
    expect(queryByText(personsFromSecondPage[0])).toBeNull();

    await user.click(getByText(String(PageNumber.SecondPageNumber)));

    await waitFor(
      () => expect(getByText(personsFromSecondPage[0])).toBeInTheDocument(),
      {
        container,
        mutationObserverOptions: { childList: true },
      },
    );

    expect(queryByText(personsFromFirstPage[0])).toBeNull();

    await user.click(getByText(PageNumber.ThirdPageNumber));

    await waitFor(
      () => expect(getByText(personsFromFirstPage[0])).toBeInTheDocument(),
      {
        container,
        mutationObserverOptions: { childList: true },
      },
    );

    expect(queryByText(personsFromSecondPage[0])).toBeNull();

    await user.click(getByText(String(PageNumber.FirstPageNumber)));

    await waitFor(
      () => expect(getByText(personsFromFirstPage[0])).toBeInTheDocument(),
      {
        container,
        mutationObserverOptions: { childList: true },
      },
    );

    expect(queryByText(personsFromSecondPage[0])).toBeNull();
  });

  test('handle search', async () => {
    const { container, getByRole, getByText, queryByText } = customRender(
      <App />,
    );

    await waitFor(
      () => expect(getByText('Star War Persons')).toBeInTheDocument(),
      {
        container,
        mutationObserverOptions: { childList: true },
      },
    );

    const inputElement = getByRole('textbox') as HTMLInputElement;
    const buttonElement = getByText('Search') as HTMLButtonElement;

    expect(getByText(personsFromFirstPage[0])).toBeInTheDocument();

    await user.type(inputElement, 'test');
    await user.click(buttonElement);

    await waitFor(
      () => expect(getByText(searchPersonName)).toBeInTheDocument(),
      {
        container,
        mutationObserverOptions: { childList: true },
      },
    );

    expect(queryByText(personsFromFirstPage[0])).toBeNull();
  });
});

describe('Routing should work correctly', () => {
  test('404 page should be rendered with incorrect url', () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/bad-route'],
    });

    const { getByText } = customRender(<RouterProvider router={router} />);

    expect(getByText('404 - Page Not Found')).toBeInTheDocument();
  });
});
