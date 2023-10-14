import {
  createApi,
  EndpointDefinitions,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://0.0.0.0:8000' }),
  endpoints(): EndpointDefinitions {
    return {} as EndpointDefinitions
  },
})
