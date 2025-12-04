import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

function isTokenExpired(token: string): boolean {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return true

    // Edge Runtime compatible: используем atob вместо Buffer
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    )

    const payload = JSON.parse(jsonPayload)

    if (!payload.exp) return true

    return payload.exp * 1000 < Date.now()
  } catch {
    return true
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/dashboard')) {
    const accessToken = request.cookies.get('access_token')?.value

    if (!accessToken || isTokenExpired(accessToken)) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
