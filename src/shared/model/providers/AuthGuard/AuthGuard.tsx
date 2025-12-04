'use client'

import { useMe } from '@/shared/model/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect, type ReactNode } from 'react'

interface AuthGuardProps {
  children: ReactNode
  fallback?: ReactNode
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const { data: user, isLoading, isError } = useMe()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (isError || !user)) {
      router.push('/')
    }
  }, [isLoading, isError, user, router])

  if (isLoading) {
    return (
      fallback || (
        <div className='bg-background flex min-h-screen items-center justify-center'>
          <div className='border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent' />
        </div>
      )
    )
  }

  if (!user) {
    return (
      fallback || (
        <div className='bg-background flex min-h-screen items-center justify-center'>
          <div className='border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent' />
        </div>
      )
    )
  }

  return <>{children}</>
}
