'use client'

import SelectOption from '@/app/components/FormInputs/Select'
import { useGetColumnListQuery } from '@/services/data_source'
import { useDispatch } from 'react-redux'
import { useReportReducer } from '@/app/(dashboard)/new-report/reducer'

const Column = ({ id }: { id: number }) => {
  const newReport = useReportReducer()
  const { data, isLoading } = useGetColumnListQuery(newReport?.tableName, {
    skip: !newReport?.tableName,
  })

  const dispatch = useDispatch()
  return (
    <SelectOption
      isLoading={isLoading}
      options={data?.map((item) => ({ ...item, label: item.name, value: item.name }))}
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
