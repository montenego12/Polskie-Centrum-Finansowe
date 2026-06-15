import { NextResponse, type NextRequest } from 'next/server'

const VALID_LANGS = ['pl', 'ua']

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/pl', request.url))
  }

  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const auth = request.cookies.get('admin_auth')?.value
    const password = process.env.ADMIN_PASSWORD
    if (!auth || auth !== password) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  const langSegment = pathname.split('/')[1]
  if (langSegment && !VALID_LANGS.includes(langSegment) && !pathname.startsWith('/admin') && !pathname.startsWith('/api')) {
    return NextResponse.redirect(new URL('/pl', request.url))
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
