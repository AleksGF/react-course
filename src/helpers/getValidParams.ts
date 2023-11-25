import { FIRST_PAGE, ITEMS_PER_PAGE } from '@src/constants/constants';

export interface ValidQueryParams {
  page: number;
  itemsPerPage: number;
  search: string;
  details: number;
}

export type Value = string | string[] | undefined;

export const getValidSearchValue = (value: Value): string =>
  value && typeof value === 'string' ? value : '';

export const getValidPageNumber = (value: Value): number => {
  const pageNumber =
    value && typeof value === 'string' ? Number(value) : FIRST_PAGE;

  return !isNaN(pageNumber) && pageNumber > FIRST_PAGE
    ? pageNumber
    : FIRST_PAGE;
};

export const getValidItemsPerPage = (value: Value): number => {
  const itemsPerPageCount =
    value && typeof value === 'string' ? Number(value) : ITEMS_PER_PAGE.DEFAULT;

  return Object.values(ITEMS_PER_PAGE).includes(itemsPerPageCount)
    ? itemsPerPageCount
    : ITEMS_PER_PAGE.DEFAULT;
};

export const getValidDetailsId = (value: Value): number => {
  const detailsId = value && typeof value === 'string' ? Number(value) : 0;

  return !isNaN(detailsId) ? detailsId : 0;
};

export const getValidParams = (
  query: Record<string, Value>,
): ValidQueryParams => {
  const {
    search: searchFromURL,
    page: pageFromURL,
    limit: itemsPerPageFromURL,
    details: detailsIdFromURL,
  } = query;

  const search =
    searchFromURL && typeof searchFromURL === 'string'
      ? encodeURIComponent(searchFromURL)
      : '';

  const page = getValidPageNumber(pageFromURL);

  const itemsPerPage = getValidItemsPerPage(itemsPerPageFromURL);

  const details = getValidDetailsId(detailsIdFromURL);

  return { page, itemsPerPage, search, details };
};
