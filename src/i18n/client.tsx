'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Locale, defaultLocale, getLocaleFromPathname, locales } from './settings';

// Import translations
import enTranslations from './locales/en.json';
import ptTranslations from './locales/pt.json';

// Create a mapping of languages to their translations
const translations = {
  en: enTranslations,
  pt: ptTranslations,
} as const;

// Helper function to get nested translation values
export function getTranslation(obj: any, path: string): string {
  const keys = path.split('.');
  let result = obj;

  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key];
    } else {
      return path; // Return the path if translation not found
    }
  }

  return result as string;
}

// Create the i18n context
interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  formatNumber: (num: number, options?: Intl.NumberFormatOptions) => string;
  formatDate: (date: Date, options?: Intl.DateTimeFormatOptions) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Browser language detection
function detectBrowserLanguage(): Locale {
  if (typeof window !== 'undefined') {
    const browserLang = navigator.language.split('-')[0];
    return browserLang === 'pt' ? 'pt' : 'en';
  }
  return defaultLocale;
}

// Create the I18nProvider component
interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Determine initial locale from pathname or browser
  const pathnameLocale = pathname ? getLocaleFromPathname(pathname) : undefined;
  const initialLocale = pathnameLocale || (typeof window !== 'undefined' ? detectBrowserLanguage() : defaultLocale);

  const [locale, setLocale] = useState<Locale>(initialLocale);

  // Function to change locale
  const changeLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;

    setLocale(newLocale);

    // Update URL to reflect locale change
    if (pathname) {
      const segments = pathname.split('/').filter(Boolean);

      if (segments.length > 0 && locales.includes(segments[0] as Locale)) {
        // Replace the locale segment
        segments[0] = newLocale;
      } else {
        // Add the locale segment
        segments.unshift(newLocale);
      }

      const newPathname = `/${segments.join('/')}`;
      router.push(newPathname);
    }

    // Update document language attribute
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLocale;
    }
  };

  // Function to get a translation by key
  const t = (key: string): string => {
    return getTranslation(translations[locale], key);
  };

  // Function to format numbers according to the current locale
  const formatNumber = (num: number, options?: Intl.NumberFormatOptions): string => {
    const localeString = locale === 'en' ? 'en-US' : 'pt-BR';
    return new Intl.NumberFormat(localeString, options).format(num);
  };

  // Function to format dates according to the current locale
  const formatDate = (date: Date, options?: Intl.DateTimeFormatOptions): string => {
    const localeString = locale === 'en' ? 'en-US' : 'pt-BR';
    return new Intl.DateTimeFormat(localeString, options).format(date);
  };

  // Update document language attribute when locale changes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  // Update locale when pathname changes
  useEffect(() => {
    if (pathname) {
      const pathnameLocale = getLocaleFromPathname(pathname);
      if (pathnameLocale && pathnameLocale !== locale) {
        setLocale(pathnameLocale);
      }
    }
  }, [pathname, locale]);

  return (
    <I18nContext.Provider
      value={{
        locale,
        setLocale: changeLocale,
        t,
        formatNumber,
        formatDate
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

// Custom hook to use the i18n context
export function useI18n(): I18nContextType {
  const context = useContext(I18nContext);

  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }

  return context;
}