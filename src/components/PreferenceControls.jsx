import { useEffect, useState } from "react";
import { Icon, IconButton } from "../design-system/Primitives.jsx";
import { CountryFlag } from "../design-system/CountryFlag.jsx";
import { useTheme } from "../design-system/ThemeContext.jsx";
import { pagePaths, useLocale } from "../i18n/LocaleContext.jsx";
export function PreferenceControls() {
  const { theme, toggleTheme } = useTheme();
  const { locale, page, t } = useLocale();
  const [hash, setHash] = useState("");
  useEffect(() => {
    const update = () => setHash(location.hash);
    update();
    addEventListener("hashchange", update);
    return () => removeEventListener("hashchange", update);
  }, [page, locale]);
  const nextLocale = locale === "es" ? "en" : "es";
  function rememberLanguage() {
    try {
      localStorage.setItem("modas-laura-language", nextLocale);
    } catch {
      /* Navigation also preserves the chosen language. */
    }
  }
  return (
    <div
      className="preference-controls"
      role="group"
      aria-label={
        locale === "es" ? "Idioma y apariencia" : "Language and appearance"
      }
    >
      <a
        className="control-button language-switch"
        href={`/${pagePaths[nextLocale][page]}${hash}`}
        lang={nextLocale}
        hrefLang={nextLocale}
        aria-label={t(
          nextLocale === "en" ? "Cambiar a inglés" : "Cambiar a español",
        )}
        onClick={rememberLanguage}
      >
        <span data-locale-copy="">
          <CountryFlag country={locale === "es" ? "cr" : "us"} />
        </span>
      </a>
      <IconButton
        className="control-button theme-switch"
        label={t(
          theme === "dark" ? "Activar tema claro" : "Activar tema oscuro",
        )}
        aria-pressed={theme === "dark"}
        onClick={toggleTheme}
      >
        <Icon name={theme === "dark" ? "sun" : "moon"} />
      </IconButton>
    </div>
  );
}
