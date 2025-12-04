'use client'

import { getCookie, hasCookie } from '@/shared/lib/utils/cookies'
import { getUserIdFromToken } from '@/shared/lib/utils/jwt'
import { useMe } from '@/shared/model/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect, type ReactNode } from 'react'

interface AuthGuardProps {
  children: ReactNode
  fallback?: ReactNode
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const { data: user, isLoading, isError, error } = useMe()
  const router = useRouter()

  // Проверяем, есть ли токен, но userId не извлекается
  const hasToken = typeof window !== 'undefined' && hasCookie('access_token')
  const token = typeof window !== 'undefined' ? getCookie('access_token') : null
  const userIdFromToken = token ? getUserIdFromToken(token) : null
  const isTokenInvalid = hasToken && !userIdFromToken && !isLoading

  useEffect(() => {
    // Если токен есть, но userId не извлекается - проблема с токеном
    if (isTokenInvalid) {
      console.error('AuthGuard: Token exists but user_id cannot be extracted')
      router.push('/')
      return
    }

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
        router.push('/')
      } else {
        // Если ошибка не 401, все равно редиректим (возможно проблема с токеном)
        console.warn('Non-401 error in AuthGuard, redirecting to home', error)
        router.push('/')
      }
    }
  }, [isError, isLoading, router, error, isTokenInvalid])

  // Показываем fallback во время загрузки
  if (isLoading) {
    return (
      fallback || (
        <div className='bg-background flex min-h-screen items-center justify-center'>
          <div className='border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent' />
        </div>
      )
    )
  }

  // Если токен невалидный, показываем fallback (редирект уже в useEffect)
  if (isTokenInvalid) {
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

  // Если пользователь не авторизован, не показываем контент
  if (!user) {
    return null
  }

  // Показываем защищенный контент
  return <>{children}</>
}
