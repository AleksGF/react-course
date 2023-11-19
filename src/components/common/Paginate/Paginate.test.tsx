import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { customRender } from '@src/test/providers/customRender';
import Paginate from '@components/common/Paginate/Paginate';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { PageNumber } from '@src/test/__mocks__/mockApiData';

const options = {
  pageNumber: 4,
  itemsPerPage: 10,
  totalItemsCount: 82,
};

const router = createMemoryRouter(
  [
    {
      path: '/',
      element: <Paginate {...options} />,
    },
  ],
  {
    initialEntries: ['/'],
  },
);

const TestComponent = () => <RouterProvider router={router} />;

describe('Paginate should render correctly', () => {
  test('It should render all pages', async () => {
    const { getAllByText } = customRender(<TestComponent />);

    const pages = getAllByText(/\d/);

    expect(pages.length).toBe(9);
  });

  test('It should handle given function', async () => {
    const mockSetSearchParams = jest.spyOn(URLSearchParams.prototype, 'set');

    const { getByText, getAllByText } = customRender(<TestComponent />);

    const user = userEvent.setup();
    const pageButton = getByText(String(PageNumber.FirstPageNumber));

    expect(mockSetSearchParams.mock.calls).toHaveLength(0);

    await user.click(pageButton);

    expect(mockSetSearchParams.mock.calls).toHaveLength(1);
    expect(mockSetSearchParams.mock.lastCall).toEqual([
      'page',
      String(PageNumber.FirstPageNumber),
    ]);
    expect(getAllByText(/\d/).length).toBe(6);

    await user.click(pageButton);

    expect(mockSetSearchParams.mock.calls).toHaveLength(1);
    expect(getAllByText(/\d/).length).toBe(6);

    await user.click(getByText('<'));

    expect(mockSetSearchParams.mock.calls).toHaveLength(1);
    expect(getAllByText(/\d/).length).toBe(6);

    await user.click(getByText('>'));

    expect(mockSetSearchParams.mock.calls).toHaveLength(2);
    expect(mockSetSearchParams.mock.lastCall).toEqual([
      'page',
      String(PageNumber.SecondPageNumber),
    ]);
    expect(getAllByText(/\d/).length).toBe(6);
  });
});
