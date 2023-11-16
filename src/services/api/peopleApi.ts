import { apiClient } from '@src/services/api/apiClient';
import type {
  MultiPagePeopleApiRequest,
  PeopleApiResponse,
  Person,
} from '@src/types/apiTypes';
import { getApiPageNumber } from '@src/helpers/getApiPageNumber';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { ITEMS_PER_PAGE } from '@src/constants/constants';

const peopleApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    getPerson: builder.query<Person, number>({
      query: (id) => {
        const method = 'GET';
        const url = `people/${String(id)}`;

        return { url, method };
      },
    }),
    getMultiPagePeople: builder.query<
      PeopleApiResponse,
      MultiPagePeopleApiRequest
    >({
      async queryFn(args, _api, _extraOptions, fetchWithBQ) {
        const { itemsPerPage, searchValue, page } = args;
        const apiPageNumber = getApiPageNumber(page ?? 1, itemsPerPage);

        const firstResult = await fetchWithBQ(
          `people/?page=${apiPageNumber}${
            searchValue && searchValue.length
              ? '&search=' + encodeURIComponent(searchValue)
              : ''
          }`,
        );

        if (firstResult.error)
          return { error: firstResult.error as FetchBaseQueryError };

        const data = firstResult.data as PeopleApiResponse;
        let restQueriesCount = itemsPerPage / ITEMS_PER_PAGE.DEFAULT - 1;
        let nextPageURL = data.next;

        while (nextPageURL && restQueriesCount > 0) {
          const result = await fetchWithBQ(nextPageURL);

          if (result.error) return { data };

          const currentData = result.data as PeopleApiResponse;
          data.results.push(...currentData.results);

          restQueriesCount -= 1;
          nextPageURL = currentData.next;
        }

        return { data };
      },
    }),
  }),
});

export const { useGetPersonQuery, useGetMultiPagePeopleQuery } = peopleApi;
