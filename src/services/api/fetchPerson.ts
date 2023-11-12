import { fetchApi } from '@services/api/fetchApi';
import { API_URL } from '@constants/constants';
import type { Person } from '@/types/apiTypes';

export const fetchPerson = async (personId: string): Promise<Person | null> => {
  const personApiUrl = `${API_URL}${personId}/`;

  return await fetchApi(personApiUrl);
};
