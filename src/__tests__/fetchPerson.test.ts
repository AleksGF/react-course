import { server } from '@/test/__mocks__/mockServer';
import { fetchPerson } from '@services/api/fetchPerson';
import { apiPerson, searchPersonId } from '@/test/__mocks__/mockApiData';

describe('fetchPerson should', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('fetch person from api and return it', async () => {
    const res = await fetchPerson(String(searchPersonId));

    expect(res).toEqual(apiPerson);
  });
});
