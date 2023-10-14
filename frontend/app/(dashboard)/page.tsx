'use client'

import { useSession } from 'next-auth/react'

const Dashboard = () => {
  const { data } = useSession()

  return (
    <div className=''>
      <pre>Welcome! {data?.user?.full_name}</pre>
    </div>
  )
}

export default Dashboard
