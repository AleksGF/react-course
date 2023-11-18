import { ITEMS_PER_PAGE } from '@src/constants/constants';

export const isItemsPerPageValid = (itemsPerPage: number): boolean =>
  Object.values(ITEMS_PER_PAGE).includes(itemsPerPage);
