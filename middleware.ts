// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const isLoginRoute = request.nextUrl.pathname === '/login';
  // const isApiAuthRoute = request.nextUrl.pathname.startsWith('/api/auth');

  // Allow access to login page and auth APIs without token
  if (isLoginRoute /* || isApiAuthRoute */) {
    return NextResponse.next();
  }

  // Protect admin routes – require valid token
  if (isAdminRoute && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Optional: redirect logged-in user away from login page
  if (isLoginRoute && token) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
};