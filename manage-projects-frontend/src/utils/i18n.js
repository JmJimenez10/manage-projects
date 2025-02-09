import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import translationEs_ES from "../locales/es_ES.json"
import translationEn_GB from "../locales/en_GB.json"

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "es_ES",
    debug: false,
    returnNull: false,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      es_ES: {
        translation: translationEs_ES,
      },
      en_GB: {
        translation: translationEn_GB,
      },
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  })
  .catch((error) => console.error(error));

  localStorage.getItem("i18nextLng") && localStorage.setItem("i18nextLng", localStorage.getItem("i18nextLng").replace("-", "_"))
export default i18n;