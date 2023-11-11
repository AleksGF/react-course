import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Paginate from '@components/common/Paginate/Paginate';

const changePageHandler = jest.fn();
const options = {
  changePageHandler,
  pageNumber: 3,
  pageCount: 9,
  pageRangeDisplayed: 5,
};

describe('Paginate should render correctly', () => {
  test('It should render all pages', async () => {
    render(<Paginate {...options} />);

    const pages = screen.getAllByText(/\d/);

    expect(pages.length).toBe(9);
  });

  test('It should handle given function', async () => {
    render(<Paginate {...options} />);

    const user = userEvent.setup();
    const pageButton = screen.getByText('2');

    expect(changePageHandler.mock.calls).toHaveLength(0);

    await user.click(pageButton);
    expect(changePageHandler.mock.calls).toHaveLength(1);
  });
});
