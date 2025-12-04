import { apiFetch, authKeys, updateTimezone } from '@/shared/lib/api'
import { postTelegramAuth } from '@/shared/lib/api/auth'
import { hasCookie, removeAllCookies } from '@/shared/lib/utils/cookies'
import { AuthResponse, TelegramUser, User } from '@/shared/types/auth.types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

function hasAccessToken(): boolean {
  if (typeof window === 'undefined') return false

  return hasCookie('access_token')
}

export function useMe() {
  const hasToken = hasAccessToken()

  return useQuery<User>({
    queryKey: authKeys.me(),
    queryFn: async () => {
      const response = await apiFetch<{ user: User }>('/user/me')
      return response.user
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
    mutationFn: (timezone: string) => updateTimezone(timezone),
  })
}
