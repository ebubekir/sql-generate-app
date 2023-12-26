import { Operator } from '@/types/query'
import BetweenNumber from '@/app/(dashboard)/new-report/components/Condition/Value/BetweenNumber'

const NumberValue = ({
  operator,
  onChange,
}: {
  operator: Operator
  onChange: (number: number[] | number) => void
}) => {
  if (operator === 'between') {
    return <BetweenNumber onChange={onChange} />
  }

  return (
    <input
      type='number'
      className='input input-bordered input-sm'
      placeholder='Type your value...'
      onChange={(e) => {
        onChange(Number(e.target.value))
      }}
    />
  )
}

export default NumberValue
