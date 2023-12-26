import { useState } from 'react'

const BetweenNumber = ({ onChange }: { onChange: (values: number[]) => void }) => {
  const [value, setValue] = useState<number[]>([])
  return (
    <div className='flex space-x-2'>
      <input
        type='number'
        className='input input-bordered input-sm'
        placeholder='Type your value...'
        onChange={(e) => {
          const tmpArray = [...value]
          tmpArray[0] = Number(e.target.value)
          setValue([...tmpArray])
          onChange(tmpArray)
        }}
      />
      <input
        type={'number'}
        className='input input-bordered input-sm'
        placeholder='Type your value...'
        onChange={(e) => {
          const tmpArray = [...value]
          tmpArray[1] = Number(e.target.value)
          setValue([...tmpArray])
          onChange(tmpArray)
        }}
      />
    </div>
  )
}

export default BetweenNumber
