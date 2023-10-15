'use client'

import AddDataSourceButton from '@/app/(dashboard)/data-sources/list/components/AddDataSourceButton'
import { useListDataSourceQuery } from '@/services/data_source'
import ListArea from '@/app/(dashboard)/data-sources/list/components/ListArea'

const ListDataSources = () => {
  const { data, isLoading, error } = useListDataSourceQuery(undefined)

  return (
    <div className='flex flex-col space-y-2'>
      <AddDataSourceButton />
      <ListArea isLoading={isLoading} error={error} data={data} />
    </div>
  )
}

export default ListDataSources
