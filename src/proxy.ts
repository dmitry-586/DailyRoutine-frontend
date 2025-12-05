import { isTokenExpired } from '@/shared/lib/utils/token'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (pathname.startsWith('/dashboard')) {
    const accessToken = request.cookies.get('access_token')?.value
    const refreshToken = request.cookies.get('refresh_token')?.value

    // Проверяем наличие хотя бы одного валидного токена
    const hasValidAccessToken = !!accessToken && !isTokenExpired(accessToken)
    const hasValidRefreshToken = !!refreshToken && !isTokenExpired(refreshToken)

    // Если нет ни одного валидного токена, редиректим на главную
    if (!hasValidAccessToken && !hasValidRefreshToken) {
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
