'use client'

import { PropsWithChildren } from 'react'
import RTKProvider from '@/app/store'
import { SessionProvider } from 'next-auth/react'

const Providers = ({ children }: PropsWithChildren<any>) => {
  return (
    <RTKProvider>
      <SessionProvider>{children}</SessionProvider>
    </RTKProvider>
  )
}

export default Providers
