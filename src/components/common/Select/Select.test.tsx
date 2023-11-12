import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Select from '@components/common/Select/Select';
import { ITEMS_PER_PAGE } from '@constants/constants';

const changeHandler = jest.fn();
const title: string = 'Title text';
const options: number[] = Object.values(ITEMS_PER_PAGE)
  .filter((value) => typeof value === 'number')
  .map((value) => Number(value));

const props = {
  wrapperClassName: 'some-class',
  title,
  selectName: 'some-name',
  defaultValue: ITEMS_PER_PAGE.DEFAULT,
  changeHandler,
  options,
};

describe('Select should render correctly', () => {
  test('It should render with given title', async () => {
    const { getByText } = render(<Select {...props} />);

    expect(getByText(title)).toBeInTheDocument();
  });

  test('It should render with select and option elements', async () => {
    const { getAllByRole, getByRole } = render(<Select {...props} />);

    const optionsOnScreen = getAllByRole('option');

    expect(getByRole('combobox')).toBeInTheDocument();
    expect(optionsOnScreen.length).toBe(options.length);
  });

  test('It should handle given function', async () => {
    const { getByRole } = render(<Select {...props} />);

    const user = userEvent.setup();

    expect(changeHandler.mock.calls).toHaveLength(0);

    expect((getByRole('combobox') as HTMLSelectElement).value).toBe(
      String(ITEMS_PER_PAGE.DEFAULT),
    );

    await user.selectOptions(
      getByRole('combobox'),
      String(ITEMS_PER_PAGE.DOUBLE),
    );
    expect((getByRole('combobox') as HTMLSelectElement).value).toBe(
      String(ITEMS_PER_PAGE.DOUBLE),
    );
    expect(changeHandler.mock.calls).toHaveLength(1);
  });
});
