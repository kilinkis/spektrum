import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'da'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the current pathname already has a locale prefix
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  console.log('Current pathname:', pathname);
  console.log('Pathname has locale:', pathnameHasLocale);

  if (!pathnameHasLocale) {
    const url = request.nextUrl.clone();
    url.pathname = `/en${pathname}`;
    return NextResponse.redirect(url);
  }

  // If a locale is present, allow the request to proceed
  return NextResponse.next();
}

// Configure the matcher to apply the middleware to all paths except Next.js internal paths and static files
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Any other public folder files (e.g., /assets/...)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|assets).*)',
  ],
};
