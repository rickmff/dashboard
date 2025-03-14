import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from './i18n/settings';

// Define matcher for routes that should be handled by the middleware
export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|.*\\..*).*)',
  ],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocaleFromAcceptLanguage(request) || defaultLocale;

  // e.g. incoming request is /products
  // The new URL is now /en/products or /pt/products
  return NextResponse.redirect(
    new URL(
      `/${locale}${pathname === '/' ? '' : pathname}`,
      request.url
    )
  );
}

// Get locale from Accept-Language header
function getLocaleFromAcceptLanguage(request: NextRequest): string | undefined {
  const acceptLanguage = request.headers.get('accept-language');
  if (!acceptLanguage) return undefined;

  // Parse the Accept-Language header
  const userLocales = acceptLanguage
    .split(',')
    .map(item => {
      const [locale, priority = '1.0'] = item.trim().split(';q=');
      return { locale: locale.split('-')[0], priority: parseFloat(priority) };
    })
    .sort((a, b) => b.priority - a.priority)
    .map(item => item.locale);

  // Find the first locale that is supported
  const matchedLocale = userLocales.find(locale =>
    locales.includes(locale as any)
  );

  return matchedLocale;
}