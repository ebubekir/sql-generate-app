'use client'

import { useListReportsQuery } from '@/services/report'
import ResultRender from '@/app/components/ResultRender'
import ReportBox from '@/app/(dashboard)/reports/components/ReportBox'

const ReportsPage = () => {
  const { data, error, isLoading } = useListReportsQuery(null)

  return (
    <div>
      <div className='overflow-x-auto'>
        <ResultRender result={{ isLoading, error }}>
          <div>
            {data?.length &&
              data.length > 0 &&
              data.map((report, index) => <ReportBox key={index} report={report} />)}
          </div>
        </ResultRender>
      </div>
    </div>
  )
}

export default ReportsPage
