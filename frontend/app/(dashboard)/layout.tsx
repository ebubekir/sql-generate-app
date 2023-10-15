'use client'

import React from 'react'
import Navbar from '@/app/(dashboard)/components/Navbar'
import { usePathname } from 'next/navigation'
import BreadCrumb from '@/app/(dashboard)/components/BreadCrumb'
import ProtectRoute from '@/app/(dashboard)/protect'
import { useSession } from 'next-auth/react'
import { useDispatch } from 'react-redux'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const { data } = useSession()
  const dispatch = useDispatch()

  dispatch({ type: 'USER', user: data?.user })

  return (
    <ProtectRoute>
      <div>
        <Navbar />
        <div className='pl-6 pt-4'>
          <BreadCrumb pathname={pathname} />
          {children}
        </div>
      </div>
    </ProtectRoute>
  )
}

export default DashboardLayout
