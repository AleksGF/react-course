import React from 'react';
import '@testing-library/jest-dom';
import { customRender } from '@/test/providers/customRender';
import Layout from '@components/Layout/Layout';
import { mockContextsProps } from '@/test/__mocks__/mockContext';

describe('Layout should render correctly', () => {
  test('it should render Loader when isLoading = true', () => {
    const { getByTestId, getByText } = customRender(<Layout />, {
      contextsProps: {
        ...mockContextsProps,
        loadingStatusContextProps: {
          ...mockContextsProps.loadingStatusContextProps,
          isLoading: true,
        },
      },
      route: '/',
    });

    expect(getByTestId('circle')).toBeInTheDocument();
    expect(getByText('Search')).toBeInTheDocument();
  });

  test('it should not render Loader when isLoading = false', () => {
    const { queryByTestId, getByText } = customRender(<Layout />, {
      contextsProps: mockContextsProps,
      route: '/',
    });

    expect(queryByTestId('circle')).toBeNull();
    expect(getByText('Search')).toBeInTheDocument();
  });
});
