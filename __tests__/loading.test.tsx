/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/';
import { render, screen } from '@testing-library/react';
import Loading from '@pages/loading/index';
import { getMockLocation } from '@src/tests/__mocks__/getMockLocation';
import {
  FIRST_PAGE,
  ITEMS_PER_PAGE,
  RoutePath,
  SearchParamsKeys,
} from '@src/constants/constants';

const testValue = 'test_value';
const testHost = 'http://localhost:3000';
const testLocation = `${testHost}${RoutePath.LOADING}?${SearchParamsKeys.SEARCH_VALUE}=${testValue}&${SearchParamsKeys.PAGE_NUMBER}=${FIRST_PAGE}&${SearchParamsKeys.ITEMS_PER_PAGE}=${ITEMS_PER_PAGE.DEFAULT}`;

const { getHref, assignLocation } = getMockLocation(testLocation);

describe('Loading page', () => {
  it('renders a loader', () => {
    render(<Loading />);

    expect(screen.getByTestId('circle')).toBeInTheDocument();
  });

  it('get location.href', () => {
    render(<Loading />);

    expect(getHref.mock.calls).toHaveLength(1);
  });

  it('redirect user to main page with correct searchParams', () => {
    render(<Loading />);

    expect(assignLocation.mock.calls).toHaveLength(1);
    expect(assignLocation.mock.calls.toString()).toBe(
      `${testHost}${RoutePath.MAIN}?${SearchParamsKeys.SEARCH_VALUE}=${testValue}&${SearchParamsKeys.PAGE_NUMBER}=${FIRST_PAGE}&${SearchParamsKeys.ITEMS_PER_PAGE}=${ITEMS_PER_PAGE.DEFAULT}`,
    );
  });
});
