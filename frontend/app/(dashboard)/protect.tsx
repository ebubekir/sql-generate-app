'use client'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import LoadingFullScreen from '@/app/(dashboard)/components/LoadingFullScreen'

const ProtectRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace('/login')
    },
  })

  if (status === 'loading') {
    return <LoadingFullScreen />
  }

  return children
}

export default ProtectRoute
