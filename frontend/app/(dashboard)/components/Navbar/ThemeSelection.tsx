'use client'

import { useEffect, useState } from 'react'
import { getCurrentTheme, switchTheme } from '@/utils/theme'
import { MoonIcon, SunIcon } from '@heroicons/react/20/solid'

const ThemeSelection = () => {
  const [theme, setTheme] = useState<string>('light')
  useEffect(() => {
    setTheme(getCurrentTheme())
  }, [theme])

  return (
    <button
      onClick={() => {
        switchTheme()
        setTheme(theme === 'light' ? 'dark' : 'light')
      }}
      className='flex h-10 w-10 items-center rounded-full p-2 hover:bg-base-300'
    >
      {theme === 'light' ? (
        <MoonIcon className='h-6 w-6 text-primary' />
      ) : (
        <SunIcon className='h-6 w-6' />
      )}
    </button>
  )
}

export default ThemeSelection
