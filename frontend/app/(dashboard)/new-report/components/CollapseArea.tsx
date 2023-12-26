import React from 'react'

const CollapseArea = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => {
  return (
    <div className=' collapse  overflow-visible bg-base-200'>
      <input type='checkbox' />
      <div className='text-m collapse-title font-medium'>{title}</div>
      <div className='collapse-content'>{children}</div>
    </div>
  )
}

export default CollapseArea
