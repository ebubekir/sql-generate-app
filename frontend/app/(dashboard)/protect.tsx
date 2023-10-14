'use client'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Loading from '@/app/(dashboard)/components/loading'

const ProtectRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace('/login')
    },
  })

  if (status === 'loading') {
    return <Loading />
  }

  return children
}

export default ProtectRoute
