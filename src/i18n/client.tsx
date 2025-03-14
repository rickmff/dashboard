'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Locale, defaultLocale } from './settings';

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
  // Get initial locale from localStorage or browser preference
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  // Initialize locale on client side
  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') as Locale | null;
    const initialLocale = savedLocale || detectBrowserLanguage();
    setLocale(initialLocale);

    // Update document language attribute
    document.documentElement.lang = initialLocale;
  }, []);

  // Function to change locale
  const changeLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;

    setLocale(newLocale);

    // Save to localStorage
    localStorage.setItem('locale', newLocale);

    // Update document language attribute
    document.documentElement.lang = newLocale;
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