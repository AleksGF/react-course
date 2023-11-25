/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { server } from '@src/tests/__mocks__/mockServer';
import Main from '@pages/main/index';
import {
  apiListPageOne,
  apiPerson,
  personsFromFirstPage,
  searchPersonName,
} from '@src/tests/__mocks__/mockApiData';
import {
  FIRST_PAGE,
  ITEMS_PER_PAGE,
  RoutePath,
  SearchParamsKeys,
} from '@src/constants/constants';

const user = userEvent.setup();

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

const mockUseRouter = jest.spyOn(require('next/router'), 'useRouter');

const mockRouterPush = jest.fn();

const mockRouterImplementation = {
  query: { [SearchParamsKeys.SEARCH_VALUE]: '' },
  asPath: `${RoutePath.MAIN}?${SearchParamsKeys.PAGE_NUMBER}=${FIRST_PAGE}&${SearchParamsKeys.ITEMS_PER_PAGE}=${ITEMS_PER_PAGE.DEFAULT}`,
  push: mockRouterPush,
};

describe('Main', () => {
  beforeAll(() => server.listen());
  beforeEach(() => mockRouterPush.mockClear());
  afterAll(() => server.close());

  it('renders correctly', () => {
    const view = render(<Main people={apiListPageOne} />);

    expect(view).toMatchSnapshot();
  });

  it('renders correctly with details', () => {
    const view = render(<Main people={apiListPageOne} details={apiPerson} />);

    expect(view).toMatchSnapshot();
  });

  it('renders main search input, button, select, pagination, details', () => {
    render(<Main people={apiListPageOne} details={apiPerson} />);

    expect(screen.getByTestId('searchBar')).toBeInTheDocument();
    expect(screen.getByTestId('searchInput')).toBeInTheDocument();
    expect(screen.getByTestId('searchButton')).toBeInTheDocument();
    expect(screen.getByTestId('select')).toBeInTheDocument();
    expect(screen.getByTestId('itemsList')).toBeInTheDocument();
    expect(screen.getByTestId('pagination__btn_prev')).toBeInTheDocument();
    expect(screen.getByTestId('pagination__page')).toBeInTheDocument();
    expect(screen.getByTestId('pagination__btn_next')).toBeInTheDocument();
    expect(screen.getByTestId('details')).toBeInTheDocument();
    expect(screen.getByTestId('details-close-btn')).toBeInTheDocument();
  });

  it('handles input text', async () => {
    render(<Main people={apiListPageOne} />);

    const inputField = screen.getByTestId('searchInput') as HTMLInputElement;

    await user.type(inputField, searchPersonName);

    expect(inputField.value).toBe(searchPersonName);
  });

  it('handles search button', async () => {
    const mockLocalStorageSetItem = jest
      .spyOn(Storage.prototype, 'setItem')
      .mockImplementation(() => jest.fn());

    mockUseRouter.mockImplementation(() => mockRouterImplementation);

    render(<Main people={apiListPageOne} />);

    const inputField = screen.getByTestId('searchInput');
    const searchButton = screen.getByTestId('searchButton');

    expect(mockLocalStorageSetItem.mock.calls).toHaveLength(0);
    expect(mockRouterPush.mock.calls).toHaveLength(0);

    await user.type(inputField, searchPersonName);
    await user.click(searchButton);

    expect(mockLocalStorageSetItem.mock.calls).toHaveLength(1);
    expect(mockRouterPush.mock.calls).toHaveLength(1);

    expect(mockRouterPush.mock.calls[0][0]).toMatch(
      `${SearchParamsKeys.SEARCH_VALUE}=${searchPersonName}`,
    );
    expect(mockRouterPush.mock.calls[0][0]).toMatch(
      `${SearchParamsKeys.ITEMS_PER_PAGE}=${ITEMS_PER_PAGE.DEFAULT}`,
    );
    expect(mockRouterPush.mock.calls[0][0]).toMatch(
      `${SearchParamsKeys.PAGE_NUMBER}=${FIRST_PAGE}`,
    );
  });

  it('handles select options', async () => {
    mockUseRouter.mockImplementation(() => mockRouterImplementation);

    render(<Main people={apiListPageOne} />);

    const selectEl = screen.getByTestId('select');

    expect(mockRouterPush.mock.calls).toHaveLength(0);

    await user.selectOptions(selectEl, String(ITEMS_PER_PAGE.DOUBLE));

    expect(mockRouterPush.mock.calls).toHaveLength(1);

    await user.selectOptions(selectEl, String(ITEMS_PER_PAGE.DEFAULT));

    expect(mockRouterPush.mock.calls).toHaveLength(2);

    expect(mockRouterPush.mock.calls[0][0]).toMatch(
      `${SearchParamsKeys.ITEMS_PER_PAGE}=${ITEMS_PER_PAGE.DOUBLE}`,
    );
    expect(mockRouterPush.mock.calls[1][0]).toMatch(
      `${SearchParamsKeys.ITEMS_PER_PAGE}=${ITEMS_PER_PAGE.DEFAULT}`,
    );
  });

  it('handles pagination', async () => {
    mockUseRouter.mockImplementation(() => mockRouterImplementation);

    render(<Main people={apiListPageOne} />);

    const prevButton = screen.getByTestId('pagination__btn_prev');
    const nextButton = screen.getByTestId('pagination__btn_next');

    expect(screen.getByText('Page# 1 from 9')).toBeInTheDocument();
    expect(prevButton).toHaveAttribute('disabled');
    expect(nextButton).not.toHaveAttribute('disabled');
    expect(mockRouterPush.mock.calls).toHaveLength(0);

    await user.click(nextButton);

    expect(mockRouterPush.mock.calls).toHaveLength(1);
    expect(mockRouterPush.mock.calls[0][0]).toMatch(
      `${SearchParamsKeys.PAGE_NUMBER}=${FIRST_PAGE + 1}`,
    );
  });

  it('handles person list click', async () => {
    render(<Main people={apiListPageOne} />, { wrapper: MemoryRouterProvider });

    for (let i = 0; i < 10; i += 1) {
      const item = screen.getByText(personsFromFirstPage[i]);

      expect(item).toBeInTheDocument();

      await user.click(item);

      expect(mockRouter.asPath).toMatch(
        `${SearchParamsKeys.DETAILS_VIEW_ID}=${i + 1}`,
      );
    }
  });

  it('handle person details close', async () => {
    mockUseRouter.mockImplementation(() => mockRouterImplementation);
    render(<Main people={apiListPageOne} details={apiPerson} />);

    const closeBtn = screen.getByTestId('details-close-btn');

    expect(closeBtn).toBeInTheDocument();
    expect(mockRouterPush.mock.calls).toHaveLength(0);

    await user.click(closeBtn);

    expect(mockRouterPush.mock.calls).toHaveLength(1);
  });
});
