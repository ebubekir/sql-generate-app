import CollapseArea from '@/app/(dashboard)/new-report/components/CollapseArea'
import Condition from '@/app/(dashboard)/new-report/components/Condition/Condition'
import { PlusIcon } from '@heroicons/react/20/solid'
import { useDispatch } from 'react-redux'
import { useConditionReducer } from '@/app/(dashboard)/new-report/reducer'

const ConditionList = () => {
  const conditions = useConditionReducer()
  const dispatch = useDispatch()

  return (
    <CollapseArea title={'3. Conditions'}>
      where...
      <div className='mb-4 flex flex-col space-y-4'>
        {Object.keys(conditions).map((i) => (
          <Condition key={i} id={Number(i)} />
        ))}
      </div>
      <button
        onClick={() => dispatch({ type: 'addCondition' })}
        className='btn btn-success btn-sm text-white'
      >
        <PlusIcon className='h-5 w-5' />
      </button>
    </CollapseArea>
  )
}

export default ConditionList
