import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { customRender } from '@/test/providers/customRender';
import NavBar from '@components/NavBar/NavBar';
import { mockContextsProps } from '@/test/__mocks__/mockContext';
import { apiListPageOne } from '@/test/__mocks__/mockApiData';

const contextsPropsWithData = {
  ...mockContextsProps,
  dataListContextProps: {
    ...mockContextsProps.dataListContextProps,
    people: apiListPageOne.results,
    totalPeopleCount: 82,
  },
};

describe('NavBar should render correctly', () => {
  test('It should show "No one was found" when no data', () => {
    const { getByText } = customRender(<NavBar />, {
      contextsProps: mockContextsProps,
      route: '/',
    });

    expect(getByText('No one was found')).toBeInTheDocument();
  });

  test('It should render list of persons when data provided', () => {
    const { getByText } = customRender(<NavBar />, {
      contextsProps: contextsPropsWithData,
      route: '/',
    });

    expect(getByText('Luke Skywalker')).toBeInTheDocument();
    expect(getByText('Obi-Wan Kenobi')).toBeInTheDocument();
  });

  test('It should render select element when data provided', () => {
    const { getByText, getByRole } = customRender(<NavBar />, {
      contextsProps: contextsPropsWithData,
      route: '/',
    });

    expect(getByText('Persons per page:')).toBeInTheDocument();
    expect(getByRole('combobox')).toBeInTheDocument();
  });

  test('It should render paginate element', () => {
    const { getByText, queryByText } = customRender(<NavBar />, {
      contextsProps: contextsPropsWithData,
      route: '/',
    });

    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('3')).toBeInTheDocument();
    expect(getByText('7')).toBeInTheDocument();
    expect(getByText('9')).toBeInTheDocument();
    expect(queryByText('11')).toBe(null);
  });

  test('It should render paginate element with double items per page', () => {
    const { getByText, queryByText } = customRender(<NavBar />, {
      contextsProps: contextsPropsWithData,
      route: '/?limit=20',
    });

    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('3')).toBeInTheDocument();
    expect(getByText('5')).toBeInTheDocument();
    expect(queryByText('6')).toBe(null);
    expect(queryByText('8')).toBe(null);
  });

  test('It should handle searchParams for details', async () => {
    const { getByText } = customRender(<NavBar />, {
      contextsProps: contextsPropsWithData,
      route: '/',
    });

    const user = userEvent.setup();

    const target = getByText('Luke Skywalker') as HTMLElement;
    expect(target).toBeInTheDocument();

    expect(window.location.search).toBe('');

    await user.click(target);
    expect(window.location.search).toBe('?details=1');

    await user.click(target);
    expect(window.location.search).toBe('');
  });
});
