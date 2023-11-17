import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '@src/components/common/Button/Button';

const handler = jest.fn();
const titleText: string = 'Button Title';
const classText = 'submit-button';

describe('Button should render correctly', () => {
  test('It should render with given text', async () => {
    const { getByText } = render(
      <Button title={titleText} classType={classText} clickHandler={handler} />,
    );

    expect(getByText(/button/i)).toBeInTheDocument();
    expect(getByText(/title/i)).toBeInTheDocument();
    expect(getByText(titleText)).toBeInTheDocument();
  });

  test('It should handle given function', async () => {
    const { getByRole } = render(
      <Button title={titleText} classType={classText} clickHandler={handler} />,
    );

    const user = userEvent.setup();
    const button = getByRole('button');

    expect(handler.mock.calls).toHaveLength(0);

    await user.click(button);
    expect(handler.mock.calls).toHaveLength(1);

    await user.click(button);
    await user.click(button);
    expect(handler.mock.calls).toHaveLength(3);
  });
});
