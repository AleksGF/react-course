export interface Person {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

interface PeopleApiRequestParams {
  searchValue: string;
  page: number;
}

export type PeopleApiRequest = Partial<PeopleApiRequestParams>;

export interface PeopleApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Person[];
}
