import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'it', 'fr', "es"],
  defaultLocale: 'it',
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};