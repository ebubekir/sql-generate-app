import SelectOption from '@/app/components/FormInputs/Select'
import { useGetColumnListFromMultipleTablesQuery } from '@/services/data_source'
import { useReportReducer } from '@/app/(dashboard)/new-report/reducer'
import { useState } from 'react'

const getOptions = (columnList: { [tableName: string]: any } | undefined) => {
  return (
    columnList &&
    Object.keys(columnList || {})?.map((tableName) => ({
      label: tableName,
      options: columnList[tableName]?.map((column: { name: string }) => ({
        ...column,
        label: column.name,
        value: `${tableName}.${column.name}`,
      })),
    }))
  )
}

const Condition = ({
  index,
  onChange,
}: {
  index: number
  onChange: (index: number, col?: string, value?: string) => void
}) => {
  const { tableList } = useReportReducer()
  const { data, isLoading } = useGetColumnListFromMultipleTablesQuery(tableList, {
    skip: tableList.length === 0,
  })
  const [condition, setCondition] = useState<{ col?: string; value?: string }>()

  return (
    <div className='flex  justify-between space-x-2'>
      <div className='w-1/2'>
        <SelectOption
          options={getOptions(data)}
          isLoading={isLoading}
          onChange={(val) => {
            setCondition({ ...condition, col: val.value })
            onChange(index, val.value, condition?.value)
          }}
        />
      </div>
      <div className={'w-1/2'}>
        <SelectOption
          options={getOptions(data)}
          isLoading={isLoading}
          onChange={(val) => {
            setCondition({ ...condition, value: val.value })
            onChange(index, condition?.col, val.value)
          }}
        />
      </div>
    </div>
  )
}

export default Condition
