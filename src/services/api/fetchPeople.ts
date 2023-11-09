import type { Person } from '@types/apiTypes';
import type { peopleApiResponse } from '@types/apiTypes';
import { FIRST_PAGE, ITEMS_PER_PAGE } from '@constants/constants';

//TODO Refactor this
export const fetchPeople = async (
  currentPage: number = FIRST_PAGE,
  personsPerPage: ITEMS_PER_PAGE = ITEMS_PER_PAGE.DEFAULT,
  searchValue: string = '',
): Promise<{ totalCount: number; people: Person[] }> => {
  const peopleApiUrl = new URL('https://swapi.dev/api/people/');
  const apiItemsCount = 10;

  const page =
    personsPerPage === apiItemsCount
      ? currentPage
      : currentPage * (personsPerPage / apiItemsCount) - 1;

  peopleApiUrl.searchParams.append('page', String(page));

  if (searchValue) {
    peopleApiUrl.searchParams.append('search', searchValue);
  }

  try {
    const people: Person[] = [];
    const response = await fetch(peopleApiUrl);

    if (!response.ok) return { totalCount: 0, people: [] };

    const data = (await response.json()) as peopleApiResponse;

    people.push(...data.results);

    if (personsPerPage / apiItemsCount === 2 && data.next !== null) {
      peopleApiUrl.searchParams.set('page', String(page + 1));
      const secondResponse = await fetch(peopleApiUrl);

      if (!secondResponse.ok) return { totalCount: 0, people: [] };

      const secondData = (await secondResponse.json()) as peopleApiResponse;
      people.push(...secondData.results);
    }

    return { totalCount: data.count, people };
  } catch (error) {
    return { totalCount: 0, people: [] };
  }
};
