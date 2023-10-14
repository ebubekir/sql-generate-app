'use client'

import './globals.css'
import { Gabarito } from 'next/font/google'
import { RTKProvider } from '@/app/store'
import { SessionProvider } from 'next-auth/react'

const inter = Gabarito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' data-theme='light'>
      <SessionProvider>
        <RTKProvider>
            <body className={inter.className}>{children}</body>
        </RTKProvider>
      </SessionProvider>
    </html>
  )
}
