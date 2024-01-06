import ValueRenderer from '@/app/(dashboard)/new-report/components/Condition/Value/ValueRenderer'
import { useDispatch } from 'react-redux'
import { useConditionReducer } from '@/app/(dashboard)/new-report/reducer'

const Value = ({ id }: { id: number }) => {
  const { col, colType, op } = useConditionReducer()[id]
  const dispatch = useDispatch()
  return (
    <div className='w-full'>
      {colType && op && (
        <ValueRenderer
          type={colType}
          operator={op}
          col={col}
          tableName={col?.col.slice(0, col.col.indexOf('.'))}
          onChange={(val) =>
            dispatch({
              type: 'dispatchValue',
              payload: {
                id,
                value: val,
              },
            })
          }
        />
      )}
    </div>
  )
}

export default Value
