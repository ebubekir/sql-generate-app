'use client'

import React from 'react'
import Navbar from '@/app/(dashboard)/components/Navbar'
import { usePathname } from 'next/navigation'
import BreadCrumb from '@/app/(dashboard)/components/BreadCrumb'
import ProtectRoute from '@/app/(dashboard)/protect'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
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
