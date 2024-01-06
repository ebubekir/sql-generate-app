import { GenerateQuery } from '@/services/query'

export enum ReportType {
  table = 'TABLE',
  line = 'LINE',
  pie = 'PIE',
  bar = 'BAR',
  sql = 'SQL',
}

export interface SaveReport {
  name: string
  description?: string | null
  request_schema: object
  report_type?: ReportType
  report_config?: object | null
  data_source_id?: number
}

export interface Report {
  id: number
  created_at: string
  updated_at: string
  name: string
  description?: string | null
  created_by_id: number
  config: GenerateQuery
  data_source_id: number
  type: ReportType
}


