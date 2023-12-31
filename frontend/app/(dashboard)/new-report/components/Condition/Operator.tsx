import SelectOption from '@/app/components/FormInputs/Select'
import { useDispatch } from 'react-redux'
import { useConditionReducer } from '@/app/(dashboard)/new-report/reducer'

const Operator = ({ id }: { id: number }) => {
  const { availableOperators, col, colType } = useConditionReducer()[id]
  const dispatch = useDispatch()
  console.log('colType', col, colType)

  return (
    <div className='w-2/3'>
      <SelectOption
        options={availableOperators}
        onChange={(val) => {
          dispatch({
            type: 'dispatchOperator',
            payload: {
              id,
              operator: val.value,
            },
          })
        }}
      />
    </div>
  )
}

export default Operator
