import { AuthResponse, TelegramUser } from '@/types/auth.types'
import { apiFetch } from './client'

export async function postTelegramAuth(
	user: TelegramUser
): Promise<AuthResponse> {
	const payload: Record<string, string> = {
		id: String(user.id),
		first_name: user.first_name,
		auth_date: String(user.auth_date),
		hash: user.hash,
	}

	if (user.last_name) payload.last_name = user.last_name
	if (user.username) payload.username = user.username
	if (user.photo_url) payload.photo_url = user.photo_url

	const response = await apiFetch<AuthResponse>('/login/telegram', {
		method: 'POST',
		data: payload,
		withCredentials: false,
	})

	if (response.access_token) {
		localStorage.setItem('access_token', response.access_token)
		if (response.refresh_token) {
			localStorage.setItem('refresh_token', response.refresh_token)
		}
	}

	return response
}

