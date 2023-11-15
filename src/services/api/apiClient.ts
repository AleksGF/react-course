import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '@src/constants/constants';
import type {
  PeopleApiRequest,
  PeopleApiResponse,
  Person,
} from '@src/types/apiTypes';

const baseUrl = API_URL;

export const apiClient = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getPeople: builder.query<PeopleApiResponse, PeopleApiRequest>({
      query: (requestParams: PeopleApiRequest) => {
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
          searchParams.size ? '/?' : ''
        }${searchParams.toString()}`;

        return { url, method };
      },
    }),
    getPerson: builder.query<Person, number>({
      query: (id: number) => {
        const method = 'GET';
        const url = `/${String(id)}`;

        return { url, method };
      },
    }),
  }),
});

export const { useGetPeopleQuery, useGetPersonQuery } = apiClient;
