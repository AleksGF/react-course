import { fetchApi } from '@src/services/fetchApi';
import { type Person } from '@src/types/apiTypes';
import { API_PEOPLE_ENDPOINT, API_URL } from '@src/constants/constants';

export const fetchDetails = async (detailsId: number): Promise<Person> =>
  await fetchApi<Person>(
    `${API_URL}${API_PEOPLE_ENDPOINT}/${String(detailsId)}`,
  );
