import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en';
import fr from './locales/fr';
import de from './locales/de';
import es from './locales/es';
import it from './locales/it';
import pt from './locales/pt';
import nl from './locales/nl';
import ar from './locales/ar';

export interface SupportedLanguage {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  rtl?: boolean;
}

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '/images/flags/gb.webp' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '/images/flags/fr.webp' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '/images/flags/de.webp' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '/images/flags/es.webp' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '/images/flags/it.webp' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '/images/flags/pt.webp' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '/images/flags/nl.webp' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '/images/flags/ar.webp', rtl: true },
];

export const RTL_LANGUAGE_CODES = SUPPORTED_LANGUAGES.filter((l) => l.rtl).map((l) => l.code);

export const NAMESPACES = [
  'common',
  'nav',
  'footer',
  'home',
  'about',
  'programs',
  'programDetail',
  'gallery',
  'donate',
  'contact',
  'zakat',
  'sponsorship',
  'volunteer',
];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en,
      fr,
      de,
      es,
      it,
      pt,
      nl,
      ar,
    },
    ns: NAMESPACES,
    defaultNS: 'common',
    fallbackLng: 'en',
    supportedLngs: SUPPORTED_LANGUAGES.map((l) => l.code),
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'aasra_lang',
    },
  });

export default i18n;
