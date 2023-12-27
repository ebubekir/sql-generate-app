import { useGenerateQueryMutation } from '@/services/query'
import Loading from '@/app/(dashboard)/components/Loading'
import SqlTextResult from '@/app/(dashboard)/new-report/components/Result/SqlTextResult'
import { ExclamationTriangleIcon, SquaresPlusIcon } from '@heroicons/react/20/solid'

const UnInitializedResult = () => (
  <div className='flex flex-col items-center text-center text-gray-300'>
    <SquaresPlusIcon className='h-16 w-16' />
    <span>You can create your report or query using the filters on the right.</span>
  </div>
)
const ErrorResult = () => <div className="flex flex-col items-center text-center text-red-400">
  <ExclamationTriangleIcon className='w-16 h-16' />
  <span>An error occurred while processing your request.</span>
</div>


const ResultMapping = {
  sql: SqlTextResult
}

const ResultRenderer = ({ type } : {type: 'sql'}) => {
  const Component = ResultMapping[type]
  return <Component />
}


const ComponentMapping = {
  pending: Loading,
  uninitialized: UnInitializedResult,
  rejected: ErrorResult,
  fulfilled: ResultRenderer,
}



const Result = () => {
  const [, result] = useGenerateQueryMutation({
    fixedCacheKey: 'query-result',
  })
  const Component = ComponentMapping[result.status]


  return <div className="flex justify-center items-center w-full  bg-gray-100 rounded-md">
    <Component type={'sql'} />
  </div>
}

export default Result
