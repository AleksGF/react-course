import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Paginate from '@components/common/Paginate/Paginate';
import { PageNumber } from '@/test/__mocks__/mockApiData';

const changePageHandler = jest.fn();
const options = {
  changePageHandler,
  pageNumber: 3,
  pageCount: 9,
  pageRangeDisplayed: 5,
};

describe('Paginate should render correctly', () => {
  test('It should render all pages', async () => {
    const { getAllByText } = render(<Paginate {...options} />);

    const pages = getAllByText(/\d/);

    expect(pages.length).toBe(options.pageCount);
  });

  test('It should handle given function', async () => {
    const { getByText } = render(<Paginate {...options} />);

    const user = userEvent.setup();
    const pageButton = getByText(String(PageNumber.SecondPageNumber));

    expect(changePageHandler.mock.calls).toHaveLength(0);

    await user.click(pageButton);
    expect(changePageHandler.mock.calls).toHaveLength(1);
  });
});
