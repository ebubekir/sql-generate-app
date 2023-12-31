'use client'

import { useGetTableListQuery } from '@/services/data_source'
import SelectOption from '@/app/components/FormInputs/Select'
import CollapseArea from '@/app/(dashboard)/new-report/components/CollapseArea'
import { useDispatch } from 'react-redux'
import AddJoinButton from '@/app/(dashboard)/new-report/components/InnerJoin/AddJoinButton'
import JoinsList from '@/app/(dashboard)/new-report/components/InnerJoin/JoinsList'

const TableList = () => {
  const { data, isLoading } = useGetTableListQuery(undefined)
  const dispatch = useDispatch()

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
          dispatch({
            type: 'addTableToTableList',
            payload: {
              tableName: val.value,
              index: 0,
            },
          })
        }}
      />
      <AddJoinButton />
      <JoinsList />
    </CollapseArea>
  )
}

export default TableList
