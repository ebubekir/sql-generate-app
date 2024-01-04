import Loading from '@/app/(dashboard)/components/Loading'
import { ExclamationCircleIcon } from '@heroicons/react/20/solid'

const ResultRender = ({
  result,
  children,
}: {
  result: any
  children: React.ReactNode
}) => {
  if (result.isLoading) {
    return <Loading />
  }

  if (result.error) {
    return (
      <div>
        <div className='alert alert-error text-white'>
          <ExclamationCircleIcon className='h-5 w-5' />
          <span>{result?.error?.data?.error_message || 'Error!'}</span>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

export default ResultRender
