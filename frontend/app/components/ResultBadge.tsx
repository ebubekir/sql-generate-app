import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/20/solid'

const ResultBadge = ({
  result,
  showSuccess = false,
}: {
  result: any
  showSuccess?: boolean
}) => {
  if (result.isUninitialized) {
    return null
  }

  if (result.isLoading) {
    return <span className='loading loading-spinner loading-sm'></span>
  }

  if (result.isError) {
    return (
      <div className='alert alert-error text-white'>
        <ExclamationCircleIcon className='h-5 w-5' />
        <span>{result?.error?.data?.error_message || 'Error!'}</span>
      </div>
    )
  }

  if (result.isSuccess && showSuccess) {
    return (
      <div className='alert alert-success text-white'>
        <CheckCircleIcon className='h-5 w-5' />
        <span>Your purchase has been confirmed!</span>
      </div>
    )
  }
}

export default ResultBadge
