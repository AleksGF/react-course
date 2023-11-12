import React from 'react';
import { jest } from '@jest/globals';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary';

jest.mock('react-router', () => ({
  ...(jest.requireActual('react-router') as object),
  useRouteError: () => 'Test Error',
}));

const mockConsoleError = jest
  .spyOn(console, 'error')
  .mockImplementation(() => undefined);

describe('ErrorBoundary should render correctly', () => {
  test('it should render error message', () => {
    const { getByText } = render(<ErrorBoundary />);

    expect(getByText(/Error happened/)).toBeInTheDocument();
    expect(mockConsoleError.mock.calls).toHaveLength(1);
  });
});
