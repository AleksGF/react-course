import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { customRender } from '@/test/providers/customRender';
import NavBar from '@components/NavBar/NavBar';
import { mockContextsProps } from '@/test/__mocks__/mockContext';
import {
  apiListPageOne,
  PageNumber,
  personsFromFirstPage,
  searchPersonId,
  totalApiPeopleCount,
} from '@/test/__mocks__/mockApiData';
import { ITEMS_PER_PAGE } from '@constants/constants';

const contextsPropsWithData = {
  ...mockContextsProps,
  dataListContextProps: {
    ...mockContextsProps.dataListContextProps,
    people: apiListPageOne.results,
    totalPeopleCount: totalApiPeopleCount,
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

    expect(getByText(personsFromFirstPage[0])).toBeInTheDocument();
    expect(getByText(personsFromFirstPage[7])).toBeInTheDocument();
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

    expect(getByText(String(PageNumber.FirstPageNumber))).toBeInTheDocument();
    expect(getByText(String(PageNumber.SecondPageNumber))).toBeInTheDocument();
    expect(getByText(String(PageNumber.ThirdPageNumber))).toBeInTheDocument();
    expect(
      getByText(
        String(Math.ceil(totalApiPeopleCount / ITEMS_PER_PAGE.DEFAULT)),
      ),
    ).toBeInTheDocument();
    expect(
      queryByText(
        String(Math.ceil(totalApiPeopleCount / ITEMS_PER_PAGE.DEFAULT) + 2),
      ),
    ).toBeNull();
  });

  test('It should render paginate element with double items per page', () => {
    const { getByText, queryByText } = customRender(<NavBar />, {
      contextsProps: contextsPropsWithData,
      route: `/?limit=${ITEMS_PER_PAGE.DOUBLE}`,
    });

    expect(getByText(String(PageNumber.FirstPageNumber))).toBeInTheDocument();
    expect(getByText(String(PageNumber.ThirdPageNumber))).toBeInTheDocument();
    expect(
      getByText(String(Math.ceil(totalApiPeopleCount / ITEMS_PER_PAGE.DOUBLE))),
    ).toBeInTheDocument();
    expect(
      queryByText(
        String(Math.ceil(totalApiPeopleCount / ITEMS_PER_PAGE.DOUBLE) + 1),
      ),
    ).toBeNull();
  });

  test('It should handle searchParams for details', async () => {
    const { getByText } = customRender(<NavBar />, {
      contextsProps: contextsPropsWithData,
      route: '/',
    });

    const user = userEvent.setup();

    const target = getByText(personsFromFirstPage[2]) as HTMLElement;
    expect(target).toBeInTheDocument();

    expect(window.location.search).toBe('');

    await user.click(target);
    expect(window.location.search).toBe(`?details=${searchPersonId}`);

    await user.click(target);
    expect(window.location.search).toBe('');
  });
});
