import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, 
    },
    // language resources
    resources: {
      en: {
        translation: {
         test: "This is a test",
         test2:"hey ho"
       
        }
      },
      fr: {
        translation: {
         test: "Ceci est un test",
         test2: "salut salut"
        
        }
      },
    }
  });

export default i18n;