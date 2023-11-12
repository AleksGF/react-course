import { server } from '@/test/__mocks__/mockServer';
import { fetchPeople } from '@services/api/fetchPeople';
import {
  apiListPageOne,
  apiListPageTwo,
  apiSearch,
  PageNumber,
  searchPersonName,
  totalApiPeopleCount,
} from '@/test/__mocks__/mockApiData';
import { ITEMS_PER_PAGE } from '@constants/constants';

describe('fetchPeople should', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('fetch the first page when has no params', async () => {
    const res = await fetchPeople();

    expect(res.people).toEqual(apiListPageOne.results);
    expect(res.totalCount).toBe(totalApiPeopleCount);
  });

  test('fetch the correct page', async () => {
    const res1 = await fetchPeople(PageNumber.FirstPageNumber);
    const res2 = await fetchPeople(PageNumber.SecondPageNumber);

    expect(res1.people).toEqual(apiListPageOne.results);
    expect(res1.totalCount).toBe(totalApiPeopleCount);
    expect(res2.people).toEqual(apiListPageTwo.results);
    expect(res2.totalCount).toBe(totalApiPeopleCount);
  });

  test('fetch with search', async () => {
    const res = await fetchPeople(
      PageNumber.FirstPageNumber,
      ITEMS_PER_PAGE.DEFAULT,
      searchPersonName,
    );

    expect(res.people).toEqual(apiSearch.results);
    expect(res.totalCount).toBe(apiSearch.results.length);
  });

  test('return double page', async () => {
    const res = await fetchPeople(
      PageNumber.FirstPageNumber,
      ITEMS_PER_PAGE.DOUBLE,
    );

    expect(res.people.length).toBe(ITEMS_PER_PAGE.DOUBLE);
    expect(res.totalCount).toBe(totalApiPeopleCount);
  });
});
