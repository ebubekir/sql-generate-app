'use client'

import AddDataSourceButton from '@/app/(dashboard)/data-sources/list/components/AddDataSourceButton'
import {
  useLazyListDataSourceQuery,
  useSetAsDefaultDataSourceMutation,
} from '@/services/data_source'
import ListArea from '@/app/(dashboard)/data-sources/list/components/ListArea'
import { useEffect } from 'react'

const ListDataSources = () => {
  const [getDataSourceList, { data, isLoading, error }] =
    useLazyListDataSourceQuery(undefined)
  const [setAsDefault] = useSetAsDefaultDataSourceMutation()

  useEffect(() => {
    getDataSourceList(undefined)
  }, [])

  return (
    <div className='flex flex-col space-y-2'>
      <AddDataSourceButton />
      <ListArea
        isLoading={isLoading}
        error={error}
        data={data}
        onSetAsDefaultClick={(id) => {
          setAsDefault(id)
          getDataSourceList(undefined)
        }}
      />
    </div>
  )
}

export default ListDataSources
