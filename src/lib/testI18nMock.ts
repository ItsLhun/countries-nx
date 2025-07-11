import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  defaultNS: 'common',
  ns: ['common'],
  debug: false,
  interpolation: { escapeValue: false },
  resources: {
    en: {
      common: {
        title: 'Countries Explorer',
        search: 'Search countries...',
        back: 'Back to list',
        capital: 'Capital',
        population: 'Population',
        region: 'Region',
        flag: 'Flag',
        lang: {
          en: 'English',
          es: 'Spanish',
        },
      },
    },
  },
});

export default i18n;
