'use client'

import SelectOption from '@/app/components/FormInputs/Select'
import { useGetColumnListFromMultipleTablesQuery } from '@/services/data_source'
import { useDispatch } from 'react-redux'
import { useReportReducer } from '@/app/(dashboard)/new-report/reducer'

const Column = ({ id }: { id: number }) => {
  const { tableList } = useReportReducer()

  const { data, isLoading } = useGetColumnListFromMultipleTablesQuery(tableList, {
    skip: tableList.length === 0,
  })
  const dispatch = useDispatch()
  return (
    <SelectOption
      isLoading={isLoading}
      options={
        data &&
        Object.keys(data || {})?.map((tableName) => ({
          label: tableName,
          options: data[tableName]?.map((column: { name: string }) => ({
            ...column,
            label: column.name,
            value: `${tableName}.${column.name}`,
          })),
        }))
      }
      onChange={(val) => {
        dispatch({
          type: 'dispatchColumn',
          payload: {
            id,
            column: val,
          },
        })
      }}
    />
  )
}

export default Column
