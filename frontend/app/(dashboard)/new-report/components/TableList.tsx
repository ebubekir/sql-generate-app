'use client'

import { useGetTableListQuery, useLazyGetColumnListQuery } from '@/services/data_source'
import SelectOption from '@/app/components/FormInputs/Select'
import CollapseArea from '@/app/(dashboard)/new-report/components/CollapseArea'
import { useDispatch } from 'react-redux'

const TableList = () => {
  const { data, isLoading } = useGetTableListQuery(undefined)
  const dispatch = useDispatch()
  const [updateColumnList] = useLazyGetColumnListQuery()

  return (
    <CollapseArea title={'1. Select a Table...'}>
      <SelectOption
        options={data?.map((item) => ({
          label: item.split('.').slice(1).join(),
          value: item.split('.').slice(1).join(),
        }))}
        isLoading={isLoading}
        placeholder={'Select a table...'}
        onChange={(val) => {
          dispatch({
            type: 'dispatchTableName',
            payload: {
              table: val.value,
            },
          })
          updateColumnList(val.value)
        }}
      />
    </CollapseArea>
  )
}

export default TableList
