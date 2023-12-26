import SelectOption from '@/app/components/FormInputs/Select'
import { useGetColumnValuesQuery } from '@/services/data_source'
import { Expression } from '@/types/query'

const StringValue = ({
  col,
  tableName,
  operator,
  onChange,
}: {
  col: Expression
  tableName: string
  operator: string
  onChange: (value: string[] | string) => void
}) => {
  const { data, isLoading } = useGetColumnValuesQuery(
    { column_name: col.col, table_name: tableName },
    {
      skip: !col || !tableName,
    }
  )

  return (
    <SelectOption
      options={data?.map((item) => ({ label: item, value: item }))}
      isLoading={isLoading}
      isMulti={operator === 'in_'}
      onChange={(val) => {
        if (operator === 'in_') onChange(val.map((v: { value: string }) => v.value))
        else onChange(val.value)
      }}
    />
  )
}

export default StringValue
