import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    // Direct Access: Bypass login and redirect directly to /pitch
    if (request.nextUrl.pathname.startsWith('/login')) {
        return NextResponse.redirect(new URL('/pitch', request.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
