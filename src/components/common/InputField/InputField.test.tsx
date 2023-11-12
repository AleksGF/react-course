import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputField from '@components/common/InputField/InputField';

const handler = jest.fn();
const fieldValue = 'Input Field Text';

describe('Input field should render correctly', () => {
  test('It should render with given text', async () => {
    const { getByRole } = render(
      <InputField value={fieldValue} setValue={handler} />,
    );

    expect(getByRole('textbox')).toBeInTheDocument();
    expect((getByRole('textbox') as HTMLInputElement).value).toBe(fieldValue);
  });

  test('It should handle given function', async () => {
    const { getByRole } = render(
      <InputField value={fieldValue} setValue={handler} />,
    );

    const user = userEvent.setup();

    expect(handler.mock.calls).toHaveLength(0);

    await user.type(getByRole('textbox'), 'test');
    expect(handler.mock.calls).toHaveLength(4);
  });
});
