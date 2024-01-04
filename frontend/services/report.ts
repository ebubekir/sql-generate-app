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

    reportDetail: builder.query<Report, number>({
      query: (report_id) => ({
        url: 'report/detail',
        params: { report_id },
      }),
    }),

    listReports: builder.query<Report[], null>({
      query: () => 'report/list',
    }),

    deleteReport: builder.mutation<any, number>({
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
  useLazyListReportsQuery,
  useListReportsQuery,
  useDeleteReportMutation,
} = reportsApi
