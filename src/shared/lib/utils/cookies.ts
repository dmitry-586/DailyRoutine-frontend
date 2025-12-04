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

  const secureFlag = secure && location.protocol === 'https:' ? '; Secure' : ''
  const cookieString = `${name}=${value}; path=/; max-age=${maxAge}; SameSite=Lax${secureFlag}`

  console.log('[setCookie]', {
    name,
    maxAge,
    secure,
    protocol: location.protocol,
    cookieString,
  })

  document.cookie = cookieString

  // Проверяем что cookie установилась
  const check = getCookie(name)
  console.log('[setCookie] Cookie set successfully:', !!check)
}

export function removeCookie(name: string): void {
  if (typeof window === 'undefined') return
  document.cookie = `${name}=; path=/; max-age=0`
}

export function removeAllCookies(): void {
  if (typeof window === 'undefined') return

  const cookies = document.cookie.split('; ')

  cookies.forEach((cookie) => {
    const name = cookie.split('=')[0]
    if (name) {
      document.cookie = `${name}=; path=/; max-age=0`
    }
  })
}

export function hasCookie(name: string): boolean {
  if (typeof window === 'undefined') return false
  return document.cookie.split('; ').some((row) => row.startsWith(`${name}=`))
}
