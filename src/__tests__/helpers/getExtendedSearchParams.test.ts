import { getExtendedSearchParams } from '@src/helpers/getExtendedSearchParams';
import {
  emptySearchParams,
  fullSearchParams,
} from '@src/test/__mocks__/mockSearchParams';
import { ITEMS_PER_PAGE } from '@src/constants/constants';
import { PageNumber, searchPersonId } from '@src/test/__mocks__/mockApiData';

describe('getExtendedSearchParams should return', () => {
  test('the same searchParams when params not provided', () => {
    expect(getExtendedSearchParams(emptySearchParams, {})).toEqual(
      emptySearchParams,
    );
    expect(getExtendedSearchParams(fullSearchParams, {})).toEqual(
      fullSearchParams,
    );
  });
  test('searchParams with added params', () => {
    expect(
      getExtendedSearchParams(emptySearchParams, {
        limit: String(ITEMS_PER_PAGE.DOUBLE),
        page: String(searchPersonId),
        string_value: 'value',
      }),
    ).toEqual(fullSearchParams);
    expect(
      getExtendedSearchParams(emptySearchParams, {
        limit: String(ITEMS_PER_PAGE.DEFAULT),
        page: String(PageNumber.FirstPageNumber),
      }),
    ).toEqual(
      new URLSearchParams({
        limit: String(ITEMS_PER_PAGE.DEFAULT),
        page: String(PageNumber.FirstPageNumber),
      }),
    );
  });
});
