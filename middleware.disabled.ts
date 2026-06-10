// middleware.ts (not .js)
import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'fr', 'de'];
const defaultLocale = 'en';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip if a valid locale is already in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Detect preferred locale from Accept-Language header
  const acceptLanguage = request.headers.get('accept-language') || '';
  let preferredLocale = defaultLocale;
  for (const locale of locales) {
    if (acceptLanguage.includes(locale)) {
      preferredLocale = locale;
      break;
    }
  }

  // Redirect to the same path but with locale prefix
  const url = new URL(`/${preferredLocale}${pathname}`, request.url);
  return NextResponse.redirect(url);
}

// Optional but recommended: restrict middleware to avoid static assets
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};