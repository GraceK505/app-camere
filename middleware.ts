// middleware.js
import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'fr', 'de'];
const defaultLocale = 'en';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (pathnameHasLocale) return;

  const acceptLanguage = request.headers.get('accept-language') || '';
  const preferredLocale = locales.find(locale => acceptLanguage.includes(locale)) || defaultLocale;
  
  return NextResponse.redirect(new URL(`/${preferredLocale}${pathname}`, request.url));
}