import { createContext, useContext } from "react";
import { en } from "./en.js";
export const pagePaths = {
  es: {
    home: "",
    corporate: "regalos-corporativos",
    designs: "disenos-personalizados",
    collection: "coleccion",
    contact: "contacto",
    history: "historia",
    archive: "archivo",
    privacy: "privacidad",
    notfound: "404.html",
  },
  en: {
    home: "en",
    corporate: "en/corporate-gifts",
    designs: "en/personalized-designs",
    collection: "en/collection",
    contact: "en/contact",
    history: "en/history",
    archive: "en/archive",
    privacy: "en/privacy",
    notfound: "en/404.html",
  },
};
export function translate(text, locale = "es") {
  if (locale === "es" || typeof text !== "string") return text;
  const key = text.trim();
  const value = en[key] ?? key;
  return text.replace(key, value);
}
const LocaleContext = createContext(null);
export function LocaleProvider({ locale = "es", page = "home", children }) {
  const t = (text) => translate(text, locale);
  const routeUrl = (path = "") => {
    const [route, hash] = path.split("#");
    const pageId = {
      historia: "history",
      "regalos-corporativos": "corporate",
      "disenos-personalizados": "designs",
      coleccion: "collection",
      contacto: "contact",
      archivo: "archive",
      privacidad: "privacy",
      "": "home",
    }[route.replace(/\/$/, "")];
    const destination = pageId
      ? pagePaths[locale][pageId]
      : `${locale === "en" ? "en/" : ""}${route}`;
    return `/${destination.replace(/\/$/, "")}${hash !== undefined ? "#" + hash : ""}`;
  };
  return (
    <LocaleContext.Provider value={{ locale, page, t, routeUrl }}>
      {children}
    </LocaleContext.Provider>
  );
}
export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("LocaleProvider is required.");
  return context;
}
