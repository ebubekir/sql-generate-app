import { baseApi } from '@/services/base'
import { Report, SaveReport } from '@/types/report'

export const reportsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addReport: builder.mutation<any, SaveReport>({
      query: (report: SaveReport) => ({
        url: 'report/save',
        method: 'POST',
        body: { ...report },
      }),
    }),

    detail: builder.query<Report, number>({
      query: (report_id) => ({
        url: 'report/detail',
        params: { report_id },
      }),
    }),

    list: builder.query<Report[], any>({
      query: () => 'report/list',
    }),

    delete: builder.mutation<any, number>({
      query: (report_id) => ({
        url: 'report/delete',
        params: { report_id },
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useAddReportMutation,
  useLazyDetailQuery,
  useListQuery,
  useDeleteMutation,
} = reportsApi
