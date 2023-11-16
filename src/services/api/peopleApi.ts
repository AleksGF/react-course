import { apiClient } from '@src/services/api/apiClient';
import type {
  PeopleApiRequest,
  PeopleApiResponse,
  Person,
} from '@src/types/apiTypes';

const peopleApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    getPeople: builder.query<PeopleApiResponse, PeopleApiRequest>({
      query: (requestParams) => {
        const method = 'GET';
        const searchParams = new URLSearchParams();

        const { searchValue, page } = requestParams;

        if (searchValue && searchValue.length) {
          searchParams.set('search', encodeURIComponent(searchValue));
        }

        if (page) {
          searchParams.set('page', String(page));
        }

        const url = `${
          searchParams.size ? 'people/?' : 'people/'
        }${searchParams.toString()}`;

        return { url, method };
      },
    }),
    getPerson: builder.query<Person, number>({
      query: (id) => {
        const method = 'GET';
        const url = `people/${String(id)}`;

        return { url, method };
      },
    }),
  }),
});

export const { useGetPeopleQuery, useGetPersonQuery } = peopleApi;
