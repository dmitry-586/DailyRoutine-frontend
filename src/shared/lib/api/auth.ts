import { setCookie } from '@/shared/lib/utils'
import { AuthResponse, TelegramUser } from '@/shared/types/auth.types'
import { apiFetch } from './client'

export async function postTelegramAuth(
  user: TelegramUser,
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
  })

  const tokens = response.tokens

  if (tokens?.access_token && typeof window !== 'undefined') {
    const isSecure = location.protocol === 'https:'

    setCookie('access_token', tokens.access_token, 7 * 24 * 60 * 60, isSecure)

    if (tokens.refresh_token) {
      setCookie(
        'refresh_token',
        tokens.refresh_token,
        7 * 24 * 60 * 60,
        isSecure,
      )
    }
  }

  return response
}

export interface TestAuthRequest {
  user_id?: number
}

export async function postTestAuth(
  request?: TestAuthRequest,
): Promise<AuthResponse> {
  const response = await apiFetch<AuthResponse>('/auth/test/token', {
    method: 'POST',
    data: request || {},
  })

  const tokens = response.tokens

  if (tokens?.access_token && typeof window !== 'undefined') {
    const isSecure = location.protocol === 'https:'

    setCookie('access_token', tokens.access_token, 7 * 24 * 60 * 60, isSecure)

    if (tokens.refresh_token) {
      setCookie(
        'refresh_token',
        tokens.refresh_token,
        7 * 24 * 60 * 60,
        isSecure,
      )
    }
  }

  return response
}
