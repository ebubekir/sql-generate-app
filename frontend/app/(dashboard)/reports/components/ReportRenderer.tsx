import { ReportRenderMapping } from '@/app/(dashboard)/reports/components/ReportTypes/mapping'
import { Report } from '@/types/report'
import { useGenerateQueryMutation } from '@/services/query'
import { useEffect } from 'react'
import Loading from '@/app/(dashboard)/components/Loading'

const ReportRenderer = ({ report }: { report: Report }) => {
  const [generateQuery, result] = useGenerateQueryMutation({
    fixedCacheKey: `queryResult${report.id}`,
  })

  useEffect(() => {
    generateQuery({ ...report.config })
  }, [])

  const Component = ReportRenderMapping[report.type]

  if (result.isLoading) {
    return <Loading />
  }

  if (result.isError) {
    return <div>An error occurred.</div>
  }

  return <Component result={result.data} />
}

export default ReportRenderer
