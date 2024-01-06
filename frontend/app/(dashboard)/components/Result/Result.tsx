import { useGenerateQueryMutation } from '@/services/query'
import Loading from '@/app/(dashboard)/components/Loading'
import SqlTextResult from '@/app/(dashboard)/components/Result/SqlTextResult'
import { ExclamationTriangleIcon, SquaresPlusIcon } from '@heroicons/react/20/solid'
import LineResult from '@/app/(dashboard)/components/Result/LineResult'
import PieResult from '@/app/(dashboard)/components/Result/PieResult'
import BarResult from '@/app/(dashboard)/components/Result/BarResult'
import TableResult from '@/app/(dashboard)/components/Result/TableResult'
import { useReportReducer } from '@/app/(dashboard)/new-report/reducer'
import { ReportType } from '@/types/report'

const UnInitializedResult = () => (
  <div className='flex w-full flex-col items-center items-center justify-center text-center text-gray-300'>
    <SquaresPlusIcon className='h-16 w-16' />
    <span>You can create your report or query using the filters on the right.</span>
  </div>
)
const ErrorResult = () => <div className="flex flex-col items-center text-center text-red-400">
  <ExclamationTriangleIcon className='w-16 h-16' />
  <span>An error occurred while processing your request.</span>
</div>


const ResultMapping = {
  SQL: SqlTextResult,
  LINE: LineResult,
  PIE: PieResult,
  BAR: BarResult,
  TABLE: TableResult
}

export const ResultRenderer = ({ type, data } : {type?: ReportType, data: any}) => {
  if (!type) {
    return <SqlTextResult data={data}  />
  }
  const Component = ResultMapping[type]
  return <Component data={data} />
}


const ComponentMapping = {
  pending: Loading,
  uninitialized: UnInitializedResult,
  rejected: ErrorResult,
  fulfilled: ResultRenderer,
}



const Result = () => {
  const { reportType } = useReportReducer()
  const [, result] = useGenerateQueryMutation({
    fixedCacheKey: 'query-result',
  })
  const Component = ComponentMapping[result.status]


  return <div className="flex border-2 border-primary w-full  bg-gray-100 rounded-md">
    <Component type={reportType} data={result.data} />
  </div>
}

export default Result
