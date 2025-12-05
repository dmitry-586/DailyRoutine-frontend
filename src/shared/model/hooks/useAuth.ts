import { apiFetch, authKeys } from '@/shared/lib/api'
import {
  postTelegramAuth,
  postTestAuth,
  type TestAuthRequest,
} from '@/shared/lib/api/auth'
import {
  getCookie,
  hasCookie,
  removeAllCookies,
} from '@/shared/lib/utils/cookies'
import { isTokenExpired } from '@/shared/lib/utils/token'
import { AuthResponse, TelegramUser, User } from '@/shared/types/auth.types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

function hasAccessOrRefreshToken(): boolean {
  if (typeof window === 'undefined') return false

  return hasCookie('access_token') || hasCookie('refresh_token')
}

export function useMe() {
  const hasToken = hasAccessOrRefreshToken()

  return useQuery<User>({
    queryKey: authKeys.me(),
    queryFn: async () => {
      const response = await apiFetch<User>('/user/me')
      return response
    },
    enabled: typeof window !== 'undefined' && hasToken,
    staleTime: 5 * 60_000,
    retry: false,
  })
}

export function useTelegramAuth() {
  const queryClient = useQueryClient()

  return useMutation<AuthResponse, Error, TelegramUser>({
    mutationKey: authKeys.telegram(),
    mutationFn: postTelegramAuth,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.me() })
    },
  })
}

// для тестового режима
export function useTestAuth() {
  const queryClient = useQueryClient()

  return useMutation<AuthResponse, Error, TestAuthRequest | undefined>({
    mutationKey: authKeys.test(),
    mutationFn: postTestAuth,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.me() })
    },
  })
}

export function useLogout() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      await apiFetch('/auth/logout', { method: 'POST' })
    },
    onSuccess: () => {
      if (typeof window !== 'undefined') {
        removeAllCookies()
        queryClient.clear()
        window.location.href = '/'
      } else {
        queryClient.clear()
      }
    },
  })
}

export function useAuthButton(
  setIsTelegramModalOpen: (isOpen: boolean) => void,
  defaultText?: string,
) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      if (typeof window === 'undefined') {
        setIsLoading(false)
        return
      }

      const accessToken = getCookie('access_token')
      const refreshToken = getCookie('refresh_token')

      const hasValidAccessToken = !!accessToken && !isTokenExpired(accessToken)
      const hasValidRefreshToken = !!refreshToken

      const authenticated = Boolean(hasValidAccessToken || hasValidRefreshToken)

      setIsAuthenticated(authenticated)
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const buttonText = isLoading
    ? 'Загрузка...'
    : isAuthenticated
      ? 'Перейти в приложение'
      : defaultText || 'Войти через Telegram'

  const handleAuthClick = () => {
    if (isLoading) return

    if (isAuthenticated) {
      router.push('/dashboard')
      return
    }

    setIsTelegramModalOpen(true)
  }

  return {
    isAuthenticated,
    handleAuthClick,
    buttonText,
    isLoading,
  }
}
