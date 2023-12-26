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
    getTableList: builder.query<string[], any>({
      query: () => 'data-source/table-list',
    }),
    getColumnList: builder.query<
      {
        name: string
        type: string
        nullable: boolean
        default?: null | any
        autoincrement: boolean
        comment?: null | string
      }[],
      any
    >({
      query: (table_name) => ({
        url: 'data-source/column-list',
        params: { table_name },
      }),
    }),
    getColumnValues: builder.query<string[], { table_name: string; column_name: string }>(
      {
        query: ({ table_name, column_name }) => ({
          url: 'data-source/column-values',
          params: { table_name, column_name },
        }),
      }
    ),
  }),
})


export const {
  useAddDataSourceMutation,
  useCheckConnectionMutation,
  useSetAsDefaultDataSourceMutation,
  useLazyListDataSourceQuery,
  useGetTableListQuery,
  useLazyGetColumnListQuery,
  useGetColumnListQuery,
  useGetColumnValuesQuery
} = dataSourceApi

export const {
  endpoints: { addDataSource, checkConnection, listDataSource },
} = dataSourceApi
