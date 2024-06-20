import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from "./langues/en.json";
import fr from "./langues/fr.json";

i18n
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, 
    },
    // language resources
    resources: {
      en: en ,
      fr: fr
    }
  });

export default i18n;