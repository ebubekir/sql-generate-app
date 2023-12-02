import { baseApi } from '@/services/base'
import {
  AddDataSourceSchema,
  CheckConnectionResult,
  CheckConnectionSchema,
  DataSource,
} from '@/types/data_source'

export const dataSourceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addDataSource: builder.mutation<any, AddDataSourceSchema>({
      query: (dataSource: AddDataSourceSchema) => ({
        url: 'data-source/add',
        method: 'POST',
        body: { ...dataSource },
      }),
    }),
    checkConnection: builder.mutation<CheckConnectionResult, CheckConnectionSchema>({
      query: (connectionCheckCredentials: CheckConnectionSchema) => ({
        url: 'data-source/check-connection',
        method: 'POST',
        body: { ...connectionCheckCredentials },
      }),
    }),
    listDataSource: builder.query<DataSource[] | [], any>({
      query: () => 'data-source/list',
    }),
    setAsDefaultDataSource: builder.mutation<boolean, number>({
      query: (data_source_id: number) => ({
        url: 'data-source/set-as-default',
        method: 'PUT',
        params: { data_source_id },
      }),
    }),
  }),
})

export const {
  useAddDataSourceMutation,
  useCheckConnectionMutation,
  useListDataSourceQuery,
  useSetAsDefaultDataSourceMutation,
  useLazyListDataSourceQuery,
} = dataSourceApi

export const {
  endpoints: { addDataSource, checkConnection, listDataSource },
} = dataSourceApi
