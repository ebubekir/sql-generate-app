import SelectOption from '@/app/components/FormInputs/Select'
import { useGetTableListQuery } from '@/services/data_source'
import { useDispatch } from 'react-redux'
import Condition from '@/app/(dashboard)/new-report/components/InnerJoin/Condition'

const JoinOption = ({ index }: { index: number }) => {
  const dispatch = useDispatch()
  const { data, isLoading } = useGetTableListQuery(undefined)

  const onConditionChange = (index: number, col?: string, value?: string) => {
    dispatch({
      type: 'updateJoinCondition',
      payload: {
        col,
        value,
        index,
      },
    })
  }

  return (
    <div className='mt-4 flex flex-col space-y-2'>
      <SelectOption
        isLoading={isLoading}
        options={data?.map((item) => ({
          label: item.split('.').slice(1).join(),
          value: item.split('.').slice(1).join(),
        }))}
        placeholder='Select a table....'
        onChange={(val) => {
          dispatch({
            type: 'addTableToTableList',
            payload: {
              tableName: val.value,
              index: index + 1,
            },
          })
          dispatch({
            type: 'updateJoinTableName',
            payload: {
              tableName: val.value,
              index,
            },
          })
        }}
      />
      <Condition index={index} onChange={onConditionChange} />
    </div>
  )
}

export default JoinOption;
