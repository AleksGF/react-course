import '@testing-library/jest-dom/';
import { handleSearchParams } from '@src/helpers/handleSearchParams';

const emptyURLString = 'path';
const validURLString = 'path?search=some&limit=10&page=3&details=2';
const paramsToAdd = { search: 'some', limit: '10', page: '3', details: '2' };
const paramsToRemove = { search: '', limit: null, page: null, details: null };

describe('handleSearchParams should', () => {
  it('add searchParams', () => {
    expect(handleSearchParams(emptyURLString, paramsToAdd)).toEqual({
      path: 'path',
      search: 'search=some&limit=10&page=3&details=2',
    });
  });

  it('remove searchParams', () => {
    expect(handleSearchParams(validURLString, paramsToRemove)).toEqual({
      path: 'path',
      search: '',
    });
  });
});
