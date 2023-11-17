import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { API_URL } from '@src/constants/constants';
import {
  apiListPageOne,
  apiListPageTwo,
  apiPerson,
  apiSearch,
} from '@src/test/__mocks__/mockApiData';

const handlers = [
  http.get(`${API_URL}people/`, ({ request }) => {
    const url = new URL(request.url);

    const pageNumber = url.searchParams.get('page');
    const searchValue = url.searchParams.get('search');

    if (searchValue) return HttpResponse.json(apiSearch);

    if (pageNumber && pageNumber === '2')
      return HttpResponse.json(apiListPageTwo);

    return HttpResponse.json(apiListPageOne);
  }),
  http.get(`${API_URL}people/:id`, () => HttpResponse.json(apiPerson)),
];

export const server = setupServer(...handlers);
