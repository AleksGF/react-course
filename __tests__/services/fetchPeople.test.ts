import '@testing-library/jest-dom/';
import { server } from '@src/tests/__mocks__/mockServer';
import { fetchPeople } from '@src/services/fetchPeople';
import {
  apiListPageOne,
  apiListPageTwo,
  apiSearch,
  searchPersonName,
} from '@src/tests/__mocks__/mockApiData';
import { FIRST_PAGE, ITEMS_PER_PAGE } from '@src/constants/constants';

describe('fetchPeople should', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());

  it('get people default count', async () => {
    expect(await fetchPeople('', FIRST_PAGE, ITEMS_PER_PAGE.DEFAULT)).toEqual(
      apiListPageOne,
    );
  });

  it('get people with search', async () => {
    expect(
      await fetchPeople(searchPersonName, FIRST_PAGE, ITEMS_PER_PAGE.DEFAULT),
    ).toEqual(apiSearch);
  });

  it('get people double count', async () => {
    const result = {
      ...apiListPageOne,
      results: [...apiListPageOne.results, ...apiListPageTwo.results],
    };

    expect(await fetchPeople('', FIRST_PAGE, ITEMS_PER_PAGE.DOUBLE)).toEqual(
      result,
    );
  });
});
