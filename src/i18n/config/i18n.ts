import en from 'i18n/lang/en.json';
import vi from 'i18n/lang/vi.json';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
i18n
  .use(Backend)

  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      vi: {
        translation: vi,
      },
      en: {
        translation: en,
      },
    },

    lng: 'vi',
    fallbackLng: 'vi',

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
