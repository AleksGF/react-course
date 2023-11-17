import { getSearchParamsWithout } from '@src/helpers/getSearchParamsWithout';
import {
  emptySearchParams,
  fullSearchParams,
} from '@src/test/__mocks__/mockSearchParams';
import { ITEMS_PER_PAGE } from '@src/constants/constants';
import { PageNumber } from '@src/test/__mocks__/mockApiData';

describe('getSearchParamsWithout should return', () => {
  test('the same searchParams when key not provided', () => {
    expect(getSearchParamsWithout(fullSearchParams, [])).toEqual(
      fullSearchParams,
    );
  });
  test('the same searchParams when key are not present in them', () => {
    expect(getSearchParamsWithout(fullSearchParams, ['list'])).toEqual(
      fullSearchParams,
    );
    expect(
      getSearchParamsWithout(fullSearchParams, ['list', 'not_correct']),
    ).toEqual(fullSearchParams);
    expect(
      getSearchParamsWithout(emptySearchParams, ['limit', 'not_correct']),
    ).toEqual(emptySearchParams);
  });
  test('searchParams without provided keys', () => {
    expect(
      getSearchParamsWithout(fullSearchParams, [
        'limit',
        'page',
        'string_value',
      ]),
    ).toEqual(emptySearchParams);
    expect(getSearchParamsWithout(fullSearchParams, ['limit', 'page'])).toEqual(
      new URLSearchParams({ string_value: 'value' }),
    );
    expect(getSearchParamsWithout(fullSearchParams, ['string_value'])).toEqual(
      new URLSearchParams({
        limit: String(ITEMS_PER_PAGE.DOUBLE),
        page: String(PageNumber.ThirdPageNumber),
      }),
    );
  });
});
