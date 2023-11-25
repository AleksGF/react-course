/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/';
import { render, screen } from '@testing-library/react';
import Home from '@pages/index';
import { getMockLocation } from '@src/tests/__mocks__/getMockLocation';
import {
  FIRST_PAGE,
  ITEMS_PER_PAGE,
  RoutePath,
  SearchParamsKeys,
} from '@src/constants/constants';

const testValue = 'test_value';
const testHost = 'http://localhost:3000';
const testPath = '/some/location';
const testLocation = `${testHost}${testPath}`;

const mockLocalStorageGetItem = jest
  .spyOn(Storage.prototype, 'getItem')
  .mockImplementation(() => testValue);

const { getHref, assignLocation } = getMockLocation(testLocation);

describe('Home', () => {
  it('renders a loader', () => {
    render(<Home />);

    expect(screen.getByTestId('circle')).toBeInTheDocument();
  });

  it('get items from localStorage', () => {
    render(<Home />);

    expect(mockLocalStorageGetItem.mock.calls).toHaveLength(1);
  });

  it('get location.href', () => {
    render(<Home />);

    expect(getHref.mock.calls).toHaveLength(1);
  });

  it('redirect user to main page with correct searchParams', () => {
    render(<Home />);

    expect(assignLocation.mock.calls).toHaveLength(1);
    expect(assignLocation.mock.calls.toString()).toBe(
      `${testHost}${RoutePath.MAIN}?${SearchParamsKeys.SEARCH_VALUE}=${testValue}&${SearchParamsKeys.PAGE_NUMBER}=${FIRST_PAGE}&${SearchParamsKeys.ITEMS_PER_PAGE}=${ITEMS_PER_PAGE.DEFAULT}`,
    );
  });
});
