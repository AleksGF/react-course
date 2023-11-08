import type { Person } from '@types/apiTypes';
import type { peopleApiResponse } from '@types/apiTypes';

export const fetchPeople = async (
  currentPage: number,
  personsPerPage: number,
  params: Record<string, string> = {},
): Promise<{ totalCount: number; people: Person[] }> => {
  const peopleApiUrl = new URL('https://swapi.dev/api/people/');
  const apiItemsCount = 10;

  const page =
    personsPerPage === apiItemsCount
      ? currentPage
      : currentPage * (personsPerPage / apiItemsCount) - 1;

  peopleApiUrl.searchParams.append('page', String(page));

  for (const [key, value] of Object.entries(params)) {
    if (value.length) peopleApiUrl.searchParams.append(key, value);
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
