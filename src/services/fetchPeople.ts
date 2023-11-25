import { fetchApi } from '@src/services/fetchApi';
import { type PeopleApiResponse } from '@src/types/apiTypes';
import {
  API_PEOPLE_ENDPOINT,
  API_URL,
  ITEMS_PER_PAGE,
} from '@src/constants/constants';

export const fetchPeople = async (
  search: string,
  page: number,
  itemsPerPage: number,
): Promise<PeopleApiResponse> => {
  const firstResult = await fetchApi<PeopleApiResponse>(
    `${API_URL}${API_PEOPLE_ENDPOINT}/?page=${page}${
      search.length ? '&search=' + search : ''
    }`,
  );

  let restQueriesCount = itemsPerPage / ITEMS_PER_PAGE.DEFAULT - 1;
  let nextPageURL = firstResult.next;

  while (nextPageURL && restQueriesCount > 0) {
    const result = await fetchApi<PeopleApiResponse>(nextPageURL);

    if (!result) return firstResult;

    firstResult.results.push(...result.results);

    restQueriesCount -= 1;
    nextPageURL = result.next;
  }

  return firstResult;
};
