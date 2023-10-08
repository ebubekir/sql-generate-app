'use client'

import { MoonIcon, PlusIcon, SunIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { getCurrentTheme, switchTheme } from '@/utils/theme'
import { useEffect, useState } from 'react'

const Navbar = () => {
  const [theme, setTheme] = useState<string | null>(null)

  useEffect(() => {
    console.log('theme changes')
    setTheme(getCurrentTheme())
  }, [theme])

  return (
    <div className='navbar border-b-2 bg-base-100'>
      <div className='navbar-start'>
        <a className='btn btn-ghost text-xl normal-case'>sql-generator-app</a>
      </div>
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal px-1'>
          <li className='flex space-x-2 '>
            <Link href={'/new-report'} className='hover:bg-primary hover:text-white'>
              <PlusIcon className='h-5 w-5' />
              New Report
            </Link>
          </li>
          <li>
            <Link href={'/reports'}>Reports</Link>
          </li>
          <li>
            <Link href={'/data-sources/list'}>
              Data Sources <span className='badge'>0</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className='navbar-end'>
        <button
          onClick={() => {
            switchTheme()
            setTheme(theme === 'light' ? 'dark' : 'light')
          }}
        >
          {theme === 'light' ? (
            <MoonIcon className='h-8 w-8 text-primary' />
          ) : (
            <SunIcon className='h-8 w-8' />
          )}
        </button>
        <div className='dropdown-end dropdown'>
          <label tabIndex={0} className='avatar btn btn-circle btn-ghost'>
            <div className='w-10 rounded-full'>
              <img src='/avatar.jpg' />
            </div>
          </label>
          <ul
            tabIndex={0}
            className='menu dropdown-content rounded-box menu-sm z-[1] mt-3 w-52 bg-base-100 p-2 shadow'
          >
            <li>
              <Link href={'/settings'}>Settings</Link>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
