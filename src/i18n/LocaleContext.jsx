import { createContext, useContext } from "react";
import { en } from "./en.js";
import { pagePaths } from "./routes.js";
export { pagePaths } from "./routes.js";
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
