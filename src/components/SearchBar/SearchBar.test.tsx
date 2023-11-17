import React from 'react';
import '@testing-library/jest-dom';
import { createMemoryRouter, RouterProvider } from 'react-router';
import userEvent from '@testing-library/user-event';
import { customRender } from '@src/test/providers/customRender';
import SearchBar from '@src/components/SearchBar/SearchBar';
import { stateWithInitialization } from '@src/test/__mocks__/mockStore';

const router = createMemoryRouter(
  [
    {
      path: '/',
      element: <SearchBar />,
    },
  ],
  {
    initialEntries: ['/'],
  },
);

const TestComponent = () => <RouterProvider router={router} />;

describe('SearchBar should render correctly', () => {
  test('it should render input field and search button', () => {
    const { getByRole } = customRender(<TestComponent />, {
      preloadedState: stateWithInitialization,
    });

    const inputElement = getByRole('textbox') as HTMLInputElement;
    const buttonElement = getByRole('button') as HTMLButtonElement;

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  test('it should handle text input', async () => {
    const { getByRole } = customRender(<TestComponent />, {
      preloadedState: stateWithInitialization,
    });

    const user = userEvent.setup();

    const inputElement = getByRole('textbox') as HTMLInputElement;

    await user.type(inputElement, 'text');
    expect(inputElement.value).toBe('text');
  });

  test('it should handle button click and trim spaces in value', async () => {
    const { getByRole } = customRender(<TestComponent />, {
      preloadedState: stateWithInitialization,
    });

    const user = userEvent.setup();

    const inputElement = getByRole('textbox') as HTMLInputElement;
    const buttonElement = getByRole('button') as HTMLButtonElement;

    expect(localStorage.getItem('rc_lastSearch')).toBeNull();

    await user.type(inputElement, ' text ');
    await user.click(buttonElement);
    expect(localStorage.getItem('rc_lastSearch')).toBe('text');
  });
});
