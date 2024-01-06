import { Report } from '@/types/report'
import { useGenerateQueryMutation } from '@/services/query'
import { useEffect } from 'react'
import { ResultRenderer } from '@/app/(dashboard)/components/Result/Result'
import Loading from '@/app/(dashboard)/components/Loading'

const ReportRenderer = ({ report }: { report: Report }) => {
  const [generateQuery, result] = useGenerateQueryMutation({
    fixedCacheKey: `queryResult${report.id}`,
  })

  useEffect(() => {
    generateQuery({ ...report.config })
  }, [])

  if (result.isLoading) {
    return <Loading />
  }

  if (result.isError) {
    return <div>An error occurred.</div>
  }

  return <ResultRenderer data={result.data} type={report.type} />
}

export default ReportRenderer
