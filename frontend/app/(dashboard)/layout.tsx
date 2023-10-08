'use client'

import React from 'react'
import Navbar from '@/app/(dashboard)/components/Navbar'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  console.log(pathname)
  return (
    <div>
      <Navbar />
      <div className='pl-6 pt-4'>
        <div className='breadcrumbs text-sm'>
          <ul>
            <li>
              <Link href={'/'}>Home</Link>
            </li>
            {pathname
              .split('/')
              .filter((i) => i.length > 0)
              .map((i, idx) => (
                <li key={idx}>
                  <Link href={pathname} className='capitalize'>
                    {i.replaceAll('/', '').replaceAll('-', ' ')}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout
