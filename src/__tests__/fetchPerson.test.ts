import { server } from '@/test/__mocks__/mockServer';
import { fetchPerson } from '@services/api/fetchPerson';
import { apiPerson } from '@/test/__mocks__/mockApiData';

describe('fetchPerson should', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('fetch person from api and return it', async () => {
    const personId = 3;
    const res = await fetchPerson(String(personId));

    expect(res).toEqual(apiPerson);
  });
});
