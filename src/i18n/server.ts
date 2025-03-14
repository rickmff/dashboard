import { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { Locale, defaultLocale } from './settings';

// Load translations
const getResources = (locale: Locale) => {
  return import(`./locales/${locale}.json`);
};

export const initServerI18n = async (locale: Locale = defaultLocale) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend(getResources))
    .init({
      lng: locale,
      fallbackLng: defaultLocale,
      supportedLngs: ['en', 'pt'],
      defaultNS: 'common',
      fallbackNS: 'common',
      interpolation: {
        escapeValue: false,
      },
    });

  return i18nInstance;
};

export async function getTranslations(locale: Locale = defaultLocale, namespace: string = 'common') {
  const i18nextInstance = await initServerI18n(locale);
  return {
    t: i18nextInstance.getFixedT(locale, namespace),
    i18n: i18nextInstance,
  };
}