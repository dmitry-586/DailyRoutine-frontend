export function getCookie(name: string): string | null {
  if (typeof window === 'undefined') return null

  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)

  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null
  }

  return null
}

export function setCookie(
  name: string,
  value: string,
  maxAge: number,
  secure = false,
): void {
  if (typeof window === 'undefined') return

  const expires = new Date()
  expires.setTime(expires.getTime() + maxAge * 1000)

  const secureFlag = secure ? '; Secure' : ''
  document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; expires=${expires.toUTCString()}; SameSite=Lax${secureFlag}`
}

export function removeCookie(name: string): void {
  if (typeof window === 'undefined') return

  // Устанавливаем expires в прошлом для гарантированного удаления
  const expires = new Date(0).toUTCString()
  document.cookie = `${name}=; path=/; max-age=0; expires=${expires}`
}

export function removeAllCookies(): void {
  if (typeof window === 'undefined') return

  const cookies = document.cookie.split('; ')
  const expires = new Date(0).toUTCString()

  cookies.forEach((cookie) => {
    const name = cookie.split('=')[0]
    if (name) {
      document.cookie = `${name}=; path=/; max-age=0; expires=${expires}`
    }
  })
}

export function hasCookie(name: string): boolean {
  if (typeof window === 'undefined') return false
  return document.cookie.split('; ').some((row) => row.startsWith(`${name}=`))
}
