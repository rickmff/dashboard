export const defaultLocale = 'en';
export const locales = ['en', 'pt'] as const;
export type Locale = (typeof locales)[number];

export const getLocaleFromPathname = (pathname: string): Locale | undefined => {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  if (locales.includes(firstSegment as Locale)) {
    return firstSegment as Locale;
  }

  return undefined;
};

export const getPathWithoutLocale = (pathname: string): string => {
  const segments = pathname.split('/').filter(Boolean);

  if (locales.includes(segments[0] as Locale)) {
    return '/' + segments.slice(1).join('/');
  }

  return pathname;
};