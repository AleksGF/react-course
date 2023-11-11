import { server } from '@/test/__mocks__/mockServer';
import { fetchPeople } from '@services/api/fetchPeople';
import {
  apiListPageOne,
  apiListPageTwo,
  apiSearch,
} from '@/test/__mocks__/mockApiData';
import { ITEMS_PER_PAGE } from '@constants/constants';

describe('fetchPeople should', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('fetch the first page when has no params', async () => {
    const res = await fetchPeople();

    expect(res.people).toEqual(apiListPageOne.results);
    expect(res.totalCount).toBe(82);
  });

  test('fetch the correct page', async () => {
    const res1 = await fetchPeople(1);
    const res2 = await fetchPeople(2);

    expect(res1.people).toEqual(apiListPageOne.results);
    expect(res1.totalCount).toBe(82);
    expect(res2.people).toEqual(apiListPageTwo.results);
    expect(res2.totalCount).toBe(82);
  });

  test('fetch with search', async () => {
    const res = await fetchPeople(1, ITEMS_PER_PAGE.DEFAULT, 'R2');

    expect(res.people).toEqual(apiSearch.results);
    expect(res.totalCount).toBe(1);
  });

  test('return double page', async () => {
    const res = await fetchPeople(1, ITEMS_PER_PAGE.DOUBLE);

    expect(res.people.length).toBe(20);
    expect(res.totalCount).toBe(82);
  });
});
