import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '@src/constants/constants';

const baseUrl = API_URL;
const prepareHeaders = (headers: Headers): Headers => {
  headers.set('Content-Type', 'application/json');

  return headers;
};

export const apiClient = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl, prepareHeaders }),
  endpoints: () => ({}),
});

export default apiClient.reducer;
