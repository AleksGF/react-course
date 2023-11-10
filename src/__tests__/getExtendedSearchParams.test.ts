import { getExtendedSearchParams } from '@helpers/getExtendedSearchParams';
import {
  emptySearchParams,
  fullSearchParams,
} from '@/test/__mocks__/mockSearchParams';

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
        limit: '20',
        page: '3',
        string_value: 'value',
      }),
    ).toEqual(fullSearchParams);
    expect(
      getExtendedSearchParams(emptySearchParams, {
        limit: '10',
        page: '1',
      }),
    ).toEqual(
      new URLSearchParams({
        limit: '10',
        page: '1',
      }),
    );
  });
});
