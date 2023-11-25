import '@testing-library/jest-dom/';
import { FIRST_PAGE, ITEMS_PER_PAGE } from '@src/constants/constants';
import { getApiPageNumber } from '@src/helpers/getApiPageNumber';

describe('getApiPageNumber should return', () => {
  it('The first page number with incorrect page number argument', () => {
    expect(getApiPageNumber()).toBe(FIRST_PAGE);
    expect(getApiPageNumber(FIRST_PAGE - 1)).toBe(FIRST_PAGE);
    expect(getApiPageNumber(FIRST_PAGE - 2)).toBe(FIRST_PAGE);
  });

  it('incoming page number without or with default items per page', () => {
    for (let i = 0; i < 110; i += 7) {
      expect(getApiPageNumber(FIRST_PAGE + i, ITEMS_PER_PAGE.DEFAULT)).toBe(
        FIRST_PAGE + i,
      );
      expect(getApiPageNumber(FIRST_PAGE + i)).toBe(FIRST_PAGE + i);
    }
  });

  it('correct page number with correct items per page argument', () => {
    for (let i = 10; i <= 100; i += 10) {
      expect(getApiPageNumber(FIRST_PAGE, i)).toBe(FIRST_PAGE);

      for (let j = 1; j <= 10; j += 1) {
        expect(getApiPageNumber(FIRST_PAGE + j, i)).toBe(
          (FIRST_PAGE + j - 1) * (i / ITEMS_PER_PAGE.DEFAULT) + 1,
        );
      }
    }
  });
});
