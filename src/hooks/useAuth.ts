import { apiFetch, authKeys } from '@/lib/api'
import { postTelegramAuth } from '@/lib/api/auth'
import { AuthResponse, TelegramUser, User } from '@/types/auth.types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useMe() {
	return useQuery<User>({
		queryKey: authKeys.me(),
		queryFn: async () => {
			const response = await apiFetch<{ user: User }>('/auth/me')
			return response.user
		},
		enabled: typeof window !== 'undefined' && !!localStorage.getItem('access_token'),
		staleTime: 5 * 60_000,
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
				localStorage.removeItem('access_token')
				localStorage.removeItem('refresh_token')
			}
			queryClient.clear()
		},
	})
}
