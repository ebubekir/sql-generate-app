import TableReport from '@/app/(dashboard)/reports/components/ReportTypes/TableReport'
import LineReport from '@/app/(dashboard)/reports/components/ReportTypes/LineReport'
import PieReport from '@/app/(dashboard)/reports/components/ReportTypes/PieReport'
import SQLReport from '@/app/(dashboard)/reports/components/ReportTypes/SQLReport'
import BarReport from '@/app/(dashboard)/reports/components/ReportTypes/BarReport'

export const ReportRenderMapping = {
  TABLE: TableReport,
  LINE: LineReport,
  PIE: PieReport,
  SQL: SQLReport,
  BAR: BarReport,
}
