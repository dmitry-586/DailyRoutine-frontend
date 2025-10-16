import { TelegramUser } from '@/types/auth/auth.type'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

export async function postTelegramAuth(user: TelegramUser): Promise<Response> {
	console.log('Sending Telegram auth request to:', `${API_BASE_URL}/auth/telegram`)
	console.log('User data:', { id: user.id, username: user.username, auth_date: user.auth_date })
	
	const url = `${API_BASE_URL}/auth/telegram`
	
	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
			credentials: 'include',
		})

		console.log('Auth response status:', response.status, response.statusText)
		
		if (!response.ok) {
			const errorText = await response.text()
			console.error('Auth error response:', errorText)
		}

		return response
	} catch (error) {
		console.error('Network error during Telegram auth:', error)
		throw error
	}
}
