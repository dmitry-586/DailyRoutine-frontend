export function decodeJWT(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split('.')

    if (parts.length !== 3) {
      return null
    }

    // Декодируем payload (вторая часть)
    const payload = parts[1]

    // Base64 URL decode
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join(''),
    )

    return JSON.parse(jsonPayload) as Record<string, unknown>
  } catch {
    return null
  }
}

/**
 * Извлекает user_id из JWT токена
 */
export function getUserIdFromToken(token: string): number | null {
  const decoded = decodeJWT(token)

  if (!decoded) {
    console.warn('getUserIdFromToken: failed to decode JWT token')
    return null
  }

  const userId = decoded.id

  if (typeof userId === 'number') {
    return userId
  }

  if (typeof userId === 'string') {
    const parsed = Number.parseInt(userId, 10)
    if (Number.isNaN(parsed)) {
      console.warn('getUserIdFromToken: id is not a valid number', userId)
      return null
    }
    return parsed
  }

  console.warn('getUserIdFromToken: id field not found or invalid type', {
    decoded,
    idType: typeof userId,
    idValue: userId,
  })
  return null
}
