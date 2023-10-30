'use client'

import { useAppSelector } from '@/app/store'

const getClassName = (
  current: number,
  step: number
): { className: string; 'data-content': number | string } => {
  if (current > step) {
    return {
      className: 'step step-primary',
      'data-content': '✓',
    }
  }

  if (current < step) {
    return {
      className: 'step',
      'data-content': step + 1,
    }
  }

  return {
    className: 'step step-primary',
    'data-content': step + 1,
  }
}

const STEPS = [
  {
    title: 'Data Source',
  },
  {
    title: 'Connection Details',
  },
  {
    title: 'Check',
  },
  {
    title: 'Finish',
  },
]


const HeadSection = () => {
  const currentStep = useAppSelector(state => state.dataSourceReducer.currentStep)
  return (
    <>
      <h4>Current State {currentStep}</h4>
      <ul className='steps'>
        {STEPS.map((item, idx) => (
          <li key={idx} {...getClassName(currentStep, idx)}>
            {item.title}
          </li>
        ))}
      </ul>
    </>
  )
}

export default HeadSection
