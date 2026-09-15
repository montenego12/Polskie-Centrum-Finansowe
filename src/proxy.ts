import { NextResponse, type NextRequest } from 'next/server'

const TP_LANGS = ['pl', 'ua']

export function proxy(request: NextRequest) {
  const { pathname, hostname } = request.nextUrl

  // PCF domain → zawsze idzie na /pcf/
  // (pathname === '/' jest obsługiwane przez next.config.ts redirects() —
  // to daje absolutny Location header, którego wymagają crawlery typu FB)
  if (hostname === 'finansewniemczech.de' || hostname === 'www.finansewniemczech.de') {
    if (!pathname.startsWith('/pcf') && pathname !== '/') {
      return NextResponse.redirect(new URL('/pcf/pl', request.url))
    }
    return
  }

  // Ktoś wszedł na /pcf/ pod domeną TaniPrad → zawsze przenieś na domenę PCF (SEO: unikamy duplicate content)
  if (pathname.startsWith('/pcf')) {
    const target = new URL(pathname, 'https://www.finansewniemczech.de')
    target.search = request.nextUrl.search
    return NextResponse.redirect(target, 308)
  }

  // pathname === '/' na tanipradwniemczech.de też jest obsługiwane przez
  // next.config.ts redirects() — tu zostaje tylko fallback dla innych
  // hostów (np. *.vercel.app preview), gdzie absolutny Location nie gra roli
  if (pathname === '/' && hostname !== 'tanipradwniemczech.de' && hostname !== 'www.tanipradwniemczech.de') {
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
  if (langSegment && !TP_LANGS.includes(langSegment) && !pathname.startsWith('/admin') && !pathname.startsWith('/api')) {
    return NextResponse.redirect(new URL('/pl', request.url))
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icon|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|webm|ogg)$).*)'],
}
