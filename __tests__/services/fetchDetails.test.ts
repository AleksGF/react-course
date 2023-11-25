import '@testing-library/jest-dom/';
import { server } from '@src/tests/__mocks__/mockServer';
import { fetchDetails } from '@src/services/fetchDetails';
import { apiPerson, apiPersonId } from '@src/tests/__mocks__/mockApiData';

describe('fetchDetails should', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());

  it('get person Details', async () => {
    expect(await fetchDetails(apiPersonId)).toEqual(apiPerson);
  });
});
