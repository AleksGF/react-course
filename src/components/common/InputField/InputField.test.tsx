import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputField from '@components/common/InputField/InputField';

const handler = jest.fn();
const fieldValue = 'Input Field Text';

describe('Input field should render correctly', () => {
  test('It should render with given text', async () => {
    render(<InputField value={fieldValue} setValue={handler} />);

    expect(await screen.getByRole('textbox')).toBeInTheDocument();
    expect(await (screen.getByRole('textbox') as HTMLInputElement).value).toBe(
      fieldValue,
    );
  });

  test('It should handle given function', async () => {
    render(<InputField value={fieldValue} setValue={handler} />);

    const user = userEvent.setup();

    //await user.click(screen.getByRole('textbox'));
    expect(handler.mock.calls).toHaveLength(0);

    await user.type(screen.getByRole('textbox'), 'test');
    expect(handler.mock.calls).toHaveLength(4);
  });
});
