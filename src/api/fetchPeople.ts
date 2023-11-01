import type { Person } from '../types/apiTypes';

export const fetchPeople = async (
  params: Record<string, string> = {}
): Promise<Person[]> => {
  const peopleApiUrl = new URL('https://swapi.dev/api/people/');

  for (const [key, value] of Object.entries(params)) {
    if (value.length) peopleApiUrl.searchParams.append(key, value);
  }

  try {
    const response = await fetch(peopleApiUrl);

    if (!response.ok) return [];

    const data = await response.json();

    return data.results;
  } catch (error) {
    return [];
  }
};
