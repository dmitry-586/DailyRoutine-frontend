import { apiFetch, authKeys, updateTimezone } from '@/shared/lib/api'
import { postTelegramAuth } from '@/shared/lib/api/auth'
import {
  getCookie,
  hasCookie,
  removeAllCookies,
} from '@/shared/lib/utils/cookies'
import { getUserIdFromToken } from '@/shared/lib/utils/jwt'
import { AuthResponse, TelegramUser, User } from '@/shared/types/auth.types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

function hasAccessToken(): boolean {
  if (typeof window === 'undefined') return false

  return hasCookie('access_token')
}

function getUserId(): number | null {
  if (typeof window === 'undefined') return null

  const token = getCookie('access_token')
  if (!token) return null

  return getUserIdFromToken(token)
}

export function useMe() {
  const userId = getUserId()
  const hasToken = hasAccessToken()

  return useQuery<User>({
    queryKey: authKeys.me(),
    queryFn: async () => {
      if (!userId) {
        throw new Error('User ID not found in token')
      }
      const response = await apiFetch<{ user: User }>(`/user/${userId}`)
      return response.user
    },
    enabled: typeof window !== 'undefined' && hasToken && userId !== null,
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

export function useUpdateTimezone() {
  return useMutation({
    mutationKey: authKeys.timezone(),
    mutationFn: updateTimezone,
  })
}
