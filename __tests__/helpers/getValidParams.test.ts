import '@testing-library/jest-dom/';
import {
  getValidParams,
  type ValidQueryParams,
  type Value,
} from '@src/helpers/getValidParams';

const testItems: { query: Record<string, Value>; result: ValidQueryParams }[] =
  [
    {
      query: {
        page: '1',
        limit: '20',
        search: 'search',
        details: '3',
      },
      result: {
        page: 1,
        itemsPerPage: 20,
        search: 'search',
        details: 3,
      },
    },
    {
      query: {
        limit: '13',
        details: 'error',
      },
      result: {
        page: 1,
        itemsPerPage: 10,
        search: '',
        details: 0,
      },
    },
    {
      query: {},
      result: {
        page: 1,
        itemsPerPage: 10,
        search: '',
        details: 0,
      },
    },
  ];

describe('getValidParams should return', () => {
  it('valid params', () => {
    for (const testItem of testItems) {
      expect(getValidParams(testItem.query)).toEqual(testItem.result);
    }
  });
});
