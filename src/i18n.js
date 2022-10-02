import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import EN_MESSAGE from "./locales/en/message";
import EN_TRANSLATION from "./locales/en/translation";
import VI_MESSAGE from "./locales/vi/message";
import VI_TRANSLATION from "./locales/vi/translation";

const resources = {
  en: { translation: EN_TRANSLATION, message: EN_MESSAGE },
  vi: { translation: VI_TRANSLATION, message: VI_MESSAGE },
};
i18n.use(initReactI18next).init({
  resources,
  lng: "vi",
  debug: true,
  interpolation: {
    escapeValue: false,
  },
});
