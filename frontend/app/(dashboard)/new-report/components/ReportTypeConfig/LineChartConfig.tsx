import SelectOption from '@/app/components/FormInputs/Select'
import { useReportReducer } from '@/app/(dashboard)/new-report/reducer'
import { useGetColumnListFromMultipleTablesQuery } from '@/services/data_source'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

const getColumnList = (
  data:
    | {
        [tableName: string]: {
          name: string
          type: string
          nullable: boolean
          default?: any
          autoincrement: boolean
          comment?: string | null | undefined
        }[]
      }
    | undefined
) =>
  data &&
  Object.keys(data).map((tableName) => ({
    label: tableName,
    options: data[tableName].map((column: { name: string }) => ({
      label: column.name,
      value: `${tableName}.${column.name}`,
    })),
  }))

const LineChartConfig = () => {
  const { tableList } = useReportReducer()

  const { data, isLoading } = useGetColumnListFromMultipleTablesQuery(tableList, {
    skip: tableList.length === 0,
  })

  const dispatch = useDispatch()
  const [config, setConfig] = useState({
    xAxis: null,
    yAxis: null
  })


  return (
    <div>
      <div>
        <label>X Axis</label>
        <SelectOption options={getColumnList(data)} isLoading={isLoading} onChange={(val) => {
          dispatch({
            type: 'dispatchReportConfig',
            payload: {
              reportTypeConfig: { ...config, xAxis: val.value },
            },
          })
          setConfig({...config, xAxis: val.value})
        }} />
      </div>
      <div>
        <label>Y Axis</label>
        <SelectOption options={getColumnList(data)} isLoading={isLoading} onChange={(val) => {
          dispatch({
            type: 'dispatchReportConfig',
            payload: {
              reportTypeConfig: { ...config, yAxis: val.value },
            },
          })
          setConfig({...config, yAxis: val.value})
        }} />
      </div>
    </div>
  )
}

export default LineChartConfig
