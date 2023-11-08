import type { Person } from '@types/apiTypes';

export const fetchPerson = async (personId: string): Promise<Person | null> => {
  const personApiUrl = new URL(`https://swapi.dev/api/people/${personId}/`);

  try {
    const response = await fetch(personApiUrl);

    if (!response.ok) return null;

    return await response.json();
  } catch (error) {
    return null;
  }
};
