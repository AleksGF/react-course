import { getSearchParamsWithout } from '@helpers/getSearchParamsWithout';
import {
  emptySearchParams,
  fullSearchParams,
} from '@/test/__mocks__/mockSearchParams';

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
        limit: '20',
        page: '3',
      }),
    );
  });
});