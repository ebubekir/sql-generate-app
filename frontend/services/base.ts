import {
  createApi,
  EndpointDefinitions,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'

const NO_AUTH_ENDPOINTS = ['login', 'register']

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://0.0.0.0:8000',
    prepareHeaders: (headers, { getState, endpoint }) => {
      if (NO_AUTH_ENDPOINTS.includes(endpoint)) {
        return headers
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const user = getState()['authReducer']
      const accToken = user.user.access_token
      headers.set("Authorization", `Bearer ${accToken}`)
      return headers
    },
  }),
  endpoints(): EndpointDefinitions {
    return {} as EndpointDefinitions
  },
})
