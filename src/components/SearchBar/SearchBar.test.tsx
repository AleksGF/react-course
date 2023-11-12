import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { customRender } from '@/test/providers/customRender';
import SearchBar from '@components/SearchBar/SearchBar';
import { mockContextsProps } from '@/test/__mocks__/mockContext';

describe('SearchBar should render correctly', () => {
  test('it should render input field and search button', () => {
    const { getByRole } = customRender(<SearchBar />, {
      contextsProps: mockContextsProps,
      route: '/',
    });

    const inputElement = getByRole('textbox') as HTMLInputElement;
    const buttonElement = getByRole('button') as HTMLButtonElement;

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  test('it should handle text input', async () => {
    const { getByRole } = customRender(<SearchBar />, {
      contextsProps: mockContextsProps,
      route: '/',
    });

    const user = userEvent.setup();

    const inputElement = getByRole('textbox') as HTMLInputElement;

    await user.type(inputElement, 'text');
    expect(inputElement.value).toBe('text');
  });

  test('it should handle button click and trim spaces in value', async () => {
    const { getByRole } = customRender(<SearchBar />, {
      contextsProps: mockContextsProps,
      route: '/',
    });

    const user = userEvent.setup();

    const inputElement = getByRole('textbox') as HTMLInputElement;
    const buttonElement = getByRole('button') as HTMLButtonElement;

    expect(localStorage.getItem('rc_lastSearch')).toBeNull();

    await user.type(inputElement, ' text ');
    await user.click(buttonElement);
    expect(window.location.search).toBe('?page=1');
    expect(localStorage.getItem('rc_lastSearch')).toBe('text');
  });

  test('it should handle button click and set searchValue to context', async () => {
    const setSearchValue = jest.fn();

    const { getByRole } = customRender(<SearchBar />, {
      contextsProps: {
        ...mockContextsProps,
        searchContextProps: {
          ...mockContextsProps.searchContextProps,
          setSearchValue,
        },
      },
      route: '/',
    });

    const user = userEvent.setup();

    const inputElement = getByRole('textbox') as HTMLInputElement;
    const buttonElement = getByRole('button') as HTMLButtonElement;

    await user.type(inputElement, ' text ');
    await user.click(buttonElement);

    expect(setSearchValue.mock.calls).toHaveLength(1);
    expect(setSearchValue.mock.calls[0][0]).toBe('text');
  });
});
