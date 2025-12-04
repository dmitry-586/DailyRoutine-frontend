'use client'

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

  useEffect(() => {
    // Если запрос завершился с ошибкой авторизации (401), редиректим на главную
    if (isError && !isLoading) {
      // Проверяем, является ли ошибка ошибкой авторизации
      const isAuthError =
        error &&
        typeof error === 'object' &&
        'status' in error &&
        error.status === 401

      if (isAuthError) {
        router.push('/')
      }
    }
  }, [isError, isLoading, router, error])

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

  // Если пользователь не авторизован, не показываем контент (редирект уже произошел)
  if (!user || isError) {
    return null
  }

  // Показываем защищенный контент
  return <>{children}</>
}

