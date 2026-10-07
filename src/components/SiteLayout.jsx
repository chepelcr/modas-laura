import { useEffect, useRef, useState } from "react";
import { Button, Icon } from "../design-system/Primitives.jsx";
import { asset, site, whatsapp } from "../content/site.js";
import { useActiveSection } from "../hooks/useActiveSection.js";
import { useLocale } from "../i18n/LocaleContext.jsx";
import { PreferenceControls } from "./PreferenceControls.jsx";
export function Brand({ onClick }) {
  const { t, routeUrl } = useLocale();
  return (
    <a
      className="brand"
      href={routeUrl()}
      aria-label={t("Modas Laura, inicio")}
      onClick={onClick}
    >
      <img
        className="brand-light"
        src={asset("logo.webp")}
        width="2172"
        height="724"
        alt={t("Modas Laura. Desde 1974, Costa Rica.")}
      />
      <img
        className="brand-dark"
        src={asset("logo-dark.svg")}
        width="2172"
        height="724"
        alt=""
        aria-hidden="true"
      />
    </a>
  );
}
export function Header({ page }) {
  const { t, routeUrl } = useLocale();
  const [open, setOpen] = useState(false);
  const menu = useRef(null),
    toggle = useRef(null);
  const active = useActiveSection(open);
  const navigation = [
    { id: "coleccion", label: "Colección", path: "#coleccion" },
    { id: "historia", label: "Nuestra historia", path: "historia/" },
    { id: "archivo", label: "El archivo", path: "archivo/" },
    { id: "contacto", label: "Contacto", path: "#contacto" },
  ];
  const pageIds = { history: "historia", archive: "archivo" };
  const links = navigation.map((item) => (
    <a
      key={item.id}
      href={routeUrl(item.path)}
      aria-current={
        pageIds[page] === item.id
          ? "page"
          : active === item.id
            ? "location"
            : undefined
      }
      onClick={() => setOpen(false)}
    >
      {t(item.label)}
    </a>
  ));
  useEffect(() => {
    const dialog = menu.current,
      toggleButton = toggle.current;
    if (open) {
      const previousOverflow = document.documentElement.style.overflow;
      document.documentElement.style.overflow = "hidden";
      dialog.showModal();
      return () => {
        document.documentElement.style.overflow = previousOverflow;
        if (dialog.open) dialog.close();
        toggleButton.focus({ preventScroll: true });
      };
    }
  }, [open]);
  return (
    <>
      <header className="header">
        <div className="nav-shell">
          <Brand />
          <nav className="desktop-nav" aria-label={t("Principal")}>
            {links}
          </nav>
          <div className="header-controls">
            <PreferenceControls />
            <Button
              size="small"
              className="header-cta"
              href={whatsapp(
                t("Hola Modas Laura, quisiera información de sus productos."),
              )}
              target="_blank"
              rel="noopener"
            >
              {t("Hablemos")} <Icon />
            </Button>
            <button
              type="button"
              ref={toggle}
              className="menu-toggle"
              aria-label={t("Abrir menú")}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
      <dialog
        ref={menu}
        id="mobile-menu"
        className="mobile-menu"
        onCancel={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === menu.current) setOpen(false);
        }}
      >
        <div className="menu-head">
          <Brand onClick={() => setOpen(false)} />
          <button
            type="button"
            className="menu-close"
            aria-label={t("Cerrar menú")}
            onClick={() => setOpen(false)}
          >
            ×
          </button>
        </div>
        <nav aria-label={t("Principal móvil")}>{links}</nav>
        <Button
          href={whatsapp()}
          target="_blank"
          rel="noopener"
          onClick={() => setOpen(false)}
        >
          {t("Consultar por WhatsApp")} <Icon />
        </Button>
        <p>{t("Hecho en Costa Rica · Desde 1974")}</p>
      </dialog>
    </>
  );
}
export function Footer() {
  const { t, routeUrl } = useLocale();
  return (
    <footer className="footer">
      <div className="footer-top">
        <Brand />
        <p>
          {t("Desde 1974, seguimos dando")}
          <br />
          {t("nuevas puntadas a nuestra historia.")}
        </p>
        <a href={asset("tarjeta-actual-85x55mm.pdf")} download>
          {t("Tarjeta de presentación")} <Icon />
        </a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Modas Laura · Costa Rica</span>
        <span>
          {t("Un negocio familiar de")} {site.owner}.
        </span>
        <a href={routeUrl("privacidad/")}>{t("Privacidad")}</a>
      </div>
    </footer>
  );
}
