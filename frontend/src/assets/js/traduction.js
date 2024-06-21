import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from "./langues/en.json";
import fr from "./langues/fr.json";

// Recupera a língua salva na sessão, se houver
const langueChoisie = sessionStorage.getItem('langueChoisie') || 'fr';

i18n
  .use(initReactI18next)
  .init({
    debug: false,
    lng: langueChoisie,  // Define a língua inicial a partir do sessionStorage ou usa 'fr' como padrão
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: en,
      fr: fr
    }
  });

export default i18n;