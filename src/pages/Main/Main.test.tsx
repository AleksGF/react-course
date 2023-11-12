import React from 'react';
import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/react';
import { customRender } from '@/test/providers/customRender';
import { server } from '@/test/__mocks__/mockServer';
import Main from '@pages/Main/Main';
import { mockContextsProps } from '@/test/__mocks__/mockContext';

describe('Main page should render correctly', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('it should not render details when search param not provided', () => {
    const { getByText, queryByText, queryByTestId } = customRender(<Main />, {
      contextsProps: mockContextsProps,
      route: '/',
    });

    expect(getByText('No one was found')).toBeInTheDocument();
    expect(queryByText('Person Details:')).toBeNull();
    expect(queryByTestId('circle')).toBeNull();
  });

  test('it should render details block when search param provided', async () => {
    const { getByText, getByTestId } = customRender(<Main />, {
      contextsProps: mockContextsProps,
      route: '/?details=1',
    });

    expect(getByText('No one was found')).toBeInTheDocument();
    expect(getByTestId('circle')).toBeInTheDocument();

    await waitFor(() =>
      expect(getByText('Person Details:')).toBeInTheDocument(),
    );
  });
});
