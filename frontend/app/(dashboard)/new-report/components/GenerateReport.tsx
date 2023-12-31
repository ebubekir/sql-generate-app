import {
  getCorrectJoinsList,
  useConditionReducer,
  useReportReducer,
} from '@/app/(dashboard)/new-report/reducer'
import { generateQueryRequest, useGenerateQueryMutation } from '@/services/query'
import { getCorrectConditions } from '@/app/(dashboard)/new-report/components/Condition/reducer'

const GenerateReport = () => {
  const conditionReducer = useConditionReducer()
  const reportReducer = useReportReducer()

  const [generateQuery, result] = useGenerateQueryMutation({
    fixedCacheKey: 'query-result',
  })

  const onGenerateBtnClick = () => {
    if (reportReducer.tableName) {
      const query = generateQueryRequest({
        tableName: reportReducer.tableName,
        conditions: getCorrectConditions(conditionReducer),
        columnList: reportReducer.columnList,
        joinsList: getCorrectJoinsList(reportReducer.joinsList),
      })
      generateQuery(query)
    }
  }

  return (
    <button
      disabled={!reportReducer.tableName || result.isLoading}
      className='btn btn-info text-white'
      onClick={onGenerateBtnClick}
    >
      Generate
    </button>
  )
}

export default GenerateReport
