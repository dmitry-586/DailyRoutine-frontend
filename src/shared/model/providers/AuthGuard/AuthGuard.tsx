'use client'

import { hasCookie } from '@/shared/lib/utils/cookies'
import { useMe } from '@/shared/model/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect, type ReactNode } from 'react'

interface AuthGuardProps {
  children: ReactNode
  fallback?: ReactNode
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const { data: user, isLoading, isError, error, isFetching } = useMe()
  const router = useRouter()
  const hasToken = typeof window !== 'undefined' && hasCookie('access_token')

  useEffect(() => {
    // Логируем состояние для отладки
    console.log('AuthGuard state:', {
      isLoading,
      isError,
      hasUser: !!user,
      error,
      isFetching,
    })

    if (isError && !isLoading) {
      // Логируем ошибку для отладки
      console.error('AuthGuard error:', error)

      // Проверяем, является ли ошибка ошибкой авторизации
      const isAuthError =
        error &&
        typeof error === 'object' &&
        'status' in error &&
        error.status === 401

      // При любой ошибке редиректим на главную
      if (isAuthError) {
        console.log('AuthGuard: 401 error, redirecting to home')
        router.push('/')
      } else {
        // Если ошибка не 401, все равно редиректим (возможно проблема с токеном)
        console.warn('AuthGuard: Non-401 error, redirecting to home', error)
        router.push('/')
      }
    }
  }, [isError, isLoading, router, error, user, isFetching])

  // Показываем fallback во время загрузки
  if (isLoading || isFetching) {
    return (
      fallback || (
        <div className='bg-background flex min-h-screen items-center justify-center'>
          <div className='border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent' />
        </div>
      )
    )
  }

  // Если есть ошибка, показываем fallback (редирект уже в useEffect)
  if (isError) {
    return (
      fallback || (
        <div className='bg-background flex min-h-screen items-center justify-center'>
          <div className='border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent' />
        </div>
      )
    )
  }

  // Если пользователь не авторизован
  if (!user) {
    // Если есть токен, но нет данных пользователя и нет загрузки - проблема
    if (hasToken && !isLoading && !isFetching) {
      console.error('AuthGuard: Token exists but no user data and not loading')
      router.push('/')
      return (
        fallback || (
          <div className='bg-background flex min-h-screen items-center justify-center'>
            <div className='border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent' />
          </div>
        )
      )
    }

    console.warn('AuthGuard: No user data, returning null')
    return null
  }

  // Показываем защищенный контент
  console.log('AuthGuard: User authenticated, showing content')
  return <>{children}</>
}
