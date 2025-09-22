import { TelegramUser } from '@/types/auth/auth.type'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

export async function postTelegramAuth(user: TelegramUser): Promise<Response> {
	const response = await fetch(`${API_BASE_URL}/auth/telegram`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(user),
		credentials: 'include',
	})

	return response
}
