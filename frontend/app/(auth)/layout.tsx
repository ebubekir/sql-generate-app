import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='w-1/4 rounded-md border-2 bg-base-200 px-2 py-2'>
        <div className='flex flex-col items-center space-y-2'>{children}</div>
      </div>
    </div>
  )
}

export default AuthLayout
