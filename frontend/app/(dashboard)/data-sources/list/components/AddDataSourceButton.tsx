import Link from 'next/link'
import { PlusIcon } from '@heroicons/react/20/solid'

const AddDataSourceButton = () => {
  return (
    <Link href={'/data-sources/add'}>
      <button className='btn btn-primary btn-active flex w-fit'>
        <PlusIcon className='h-5 w-5' />
        <span>ADD</span>
      </button>
    </Link>
  )
}

export default AddDataSourceButton
