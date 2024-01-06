import { useReportReducer } from '@/app/(dashboard)/new-report/reducer'
import { useGetColumnListFromMultipleTablesQuery } from '@/services/data_source'
import SelectOption from '@/app/components/FormInputs/Select'
import { useDispatch } from 'react-redux'

const BarChartConfig = () => {
  const { tableList } = useReportReducer()

  const { data, isLoading } = useGetColumnListFromMultipleTablesQuery(tableList, {
    skip: tableList.length === 0,
  })

  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <label>Count Labels</label>
        <SelectOption
          options={
            data &&
            Object.keys(data).map((tableName) => ({
              label: tableName,
              options: data[tableName].map((column) => ({
                label: column.name,
                value: `${tableName}.${column.name}`,
              })),
            }))
          }
          onChange={(val) => {
            dispatch({
              type: 'dispatchReportConfig',
              payload: {
                reportTypeConfig: { countLabel: val.value },
              },
            })
          }}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}

export default BarChartConfig
