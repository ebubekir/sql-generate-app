import { useReportReducer } from '@/app/(dashboard)/new-report/reducer'
import LineChartConfig from '@/app/(dashboard)/new-report/components/ReportTypeConfig/LineChartConfig'
import BarChartConfig from '@/app/(dashboard)/new-report/components/ReportTypeConfig/BarChartConfig'

const ReportTypeConfig = () => {
  const { reportType } = useReportReducer()

  if (reportType === 'BAR' || reportType === 'PIE') {
    return <BarChartConfig />
  }

  if (reportType === 'LINE') {
    return <LineChartConfig />
  }

  return null
}

export default ReportTypeConfig
