import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { authMiddleware } from './middlewares/auth.middleware'

export function middleware(request: NextRequest) {
	const authResponse = authMiddleware(request)
	if (authResponse) return authResponse

	return NextResponse.next()
}

export const config = {
	matcher: ['/'],
}
