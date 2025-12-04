import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isProtectedRoute = pathname.startsWith('/dashboard')

  if (isProtectedRoute) {
    const accessToken = request.cookies.get('access_token')

    console.log('[Proxy] Protected route:', pathname)
    console.log('[Proxy] Access token exists:', !!accessToken)
    console.log('[Proxy] All cookies:', request.cookies.getAll())

    if (!accessToken) {
      console.log('[Proxy] No access token, redirecting to /')
      const url = request.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url)
    }

    console.log('[Proxy] Access token found, allowing access')
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
