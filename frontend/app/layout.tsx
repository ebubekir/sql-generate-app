import './globals.css'
import { Gabarito } from 'next/font/google'
import Providers from '@/app/providers'

const inter = Gabarito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' data-theme='light'>
      <Providers>
        <body className={inter.className}>{children}</body>
      </Providers>
    </html>
  )
}
