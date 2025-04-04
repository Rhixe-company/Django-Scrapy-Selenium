import {BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from '@reduxjs/toolkit/query/react';

export const BaseServiceQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
  const token = "xxxx";

  const rawBaseQuery = fetchBaseQuery({
    baseUrl: `http://localhost:8000/api/`,
    prepareHeaders: (headers) => {
      // headers.set('Authorization', `Bearer ${token}`);
      headers.set('Content-Type', 'application/json');

      return headers;
    }
  });

  return rawBaseQuery(args, api, extraOptions);
};
