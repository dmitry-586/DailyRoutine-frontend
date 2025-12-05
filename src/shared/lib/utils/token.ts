function decodeJWT(token: string): { exp?: number } | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null

    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    )

    return JSON.parse(jsonPayload)
  } catch {
    return null
  }
}

// Проверяет, близок ли JWT токен к истечению
export function isTokenExpiringSoon(
  token: string,
  bufferMs: number = 2 * 24 * 60 * 60 * 1000,
): boolean {
  const payload = decodeJWT(token)
  if (!payload || !payload.exp) return true

  const expirationTime = payload.exp * 1000
  const now = Date.now()
  const timeUntilExpiration = expirationTime - now

  return timeUntilExpiration <= bufferMs
}
