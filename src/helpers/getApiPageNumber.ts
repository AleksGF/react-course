import { FIRST_PAGE, ITEMS_PER_PAGE } from '@src/constants/constants';

export const getApiPageNumber = (
  pageNumber?: number,
  itemsPerPage?: number,
): number => {
  if (!pageNumber || pageNumber <= FIRST_PAGE) return FIRST_PAGE;

  if (!itemsPerPage) return pageNumber;

  return (pageNumber - 1) * (itemsPerPage / ITEMS_PER_PAGE.DEFAULT) + 1;
};
