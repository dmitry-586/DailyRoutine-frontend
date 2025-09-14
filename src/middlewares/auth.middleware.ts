import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function authMiddleware(request: NextRequest) {
	if (request.nextUrl.pathname === '/') {
		return NextResponse.redirect(new URL('/log-in', request.url))
	}

	return null
}
