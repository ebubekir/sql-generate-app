'use client'

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/app/store'

const BottomNavigation = () => {
  const dispatch = useDispatch()
  const { currentStep, nextStepAvailable } = useAppSelector(
    (state) => state.dataSourceReducer
  )

  return (
    <div className=' flex justify-between space-x-4'>
      <button
        onClick={() => dispatch({ type: 'prevStep' })}
        className='btn float-right rounded-full  bg-base-100'
        disabled={currentStep === 0}
      >
        <ChevronLeftIcon className='h-5 w-5' />
      </button>

      {currentStep !== 3 && (
        <button
          onClick={() => dispatch({ type: 'nextStep' })}
          className='btn float-right   rounded-full bg-base-100'
          disabled={currentStep === 3 || !nextStepAvailable}
        >
          <ChevronRightIcon className='h-5 w-5' />
        </button>
      )}
    </div>
  )
}

export default BottomNavigation
