import { ExclamationCircleIcon } from '@heroicons/react/20/solid'

const Error = ({ errorMessage }: { errorMessage?: string }) => (
  <div className='alert alert-error text-white'>
    <ExclamationCircleIcon className='h-5 w-5' />
    <span>{errorMessage || 'Error!'}</span>
  </div>
)

export default Error
