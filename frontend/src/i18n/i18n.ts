import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(HttpBackend) // load file json từ public/locales
  .use(LanguageDetector) // tự detect ngôn ngữ trình duyệt
  .use(initReactI18next) // kết nối với react
  .init({
    fallbackLng: "vi", // ngôn ngữ mặc định
    debug: false,
    interpolation: {
      escapeValue: false, // react đã tự xử lý XSS
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json", // nơi chứa file ngôn ngữ
    },
  });

export default i18n;
