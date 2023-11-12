import { getNumberFromSearchParams } from '@helpers/getNumberFromSearchParams';
import {
  emptySearchParams,
  fullSearchParams,
} from '@/test/__mocks__/mockSearchParams';
import { ITEMS_PER_PAGE } from '@constants/constants';
import { PageNumber } from '@/test/__mocks__/mockApiData';

describe('getNumberFromSearchParams should return:', () => {
  test('null when correct value are not present in searchParams and default value not provided', () => {
    expect(getNumberFromSearchParams(emptySearchParams, 'limit')).toBeNull();
    expect(
      getNumberFromSearchParams(fullSearchParams, 'string_value'),
    ).toBeNull();
  });
  test('default value when it provided and correct value are not present in searchParams', () => {
    expect(getNumberFromSearchParams(emptySearchParams, 'limit', 3)).toBe(3);
    expect(getNumberFromSearchParams(emptySearchParams, 'limit', 0)).toBe(0);
    expect(getNumberFromSearchParams(fullSearchParams, 'string_value', 7)).toBe(
      7,
    );
  });
  test('value type number when correct value are present in searchParams', () => {
    expect(typeof getNumberFromSearchParams(fullSearchParams, 'limit', 3)).toBe(
      'number',
    );
    expect(typeof getNumberFromSearchParams(fullSearchParams, 'page', 0)).toBe(
      'number',
    );
  });
  test('correct value when correct value are present in searchParams', () => {
    expect(getNumberFromSearchParams(fullSearchParams, 'limit', 3)).toBe(
      ITEMS_PER_PAGE.DOUBLE,
    );
    expect(getNumberFromSearchParams(fullSearchParams, 'limit')).toBe(
      ITEMS_PER_PAGE.DOUBLE,
    );
    expect(getNumberFromSearchParams(fullSearchParams, 'page', 0)).toBe(
      PageNumber.ThirdPageNumber,
    );
    expect(getNumberFromSearchParams(fullSearchParams, 'page')).toBe(
      PageNumber.ThirdPageNumber,
    );
  });
});
