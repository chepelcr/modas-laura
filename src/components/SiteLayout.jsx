import { useEffect, useRef, useState } from "react";
import { Button, Icon } from "../design-system/Primitives.jsx";
import { asset, routeUrl, site, whatsapp } from "../content/site.js";
import { useActiveSection } from "../hooks/useActiveSection.js";
export function Brand() {
  return (
    <a className="brand" href={routeUrl()} aria-label="Modas Laura, inicio">
      <img
        src={asset("logo.webp")}
        width="2172"
        height="724"
        alt="Modas Laura. Desde 1974, Costa Rica."
      />
    </a>
  );
}
export function Header({ page }) {
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
      {item.label}
    </a>
  ));
  useEffect(() => {
    const dialog = menu.current;
    const toggleButton = toggle.current;
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
          <nav className="desktop-nav" aria-label="Principal">
            {links}
          </nav>
          <Button
            size="small"
            className="header-cta"
            href={whatsapp(
              "Hola Modas Laura, quisiera información de sus productos.",
            )}
            target="_blank"
            rel="noopener"
          >
            Hablemos <Icon />
          </Button>
          <button
            type="button"
            ref={toggle}
            className="menu-toggle"
            aria-label="Abrir menú"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            <span />
            <span />
          </button>
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
          <span>Modas Laura</span>
          <button
            type="button"
            className="menu-close"
            aria-label="Cerrar menú"
            onClick={() => setOpen(false)}
          >
            ×
          </button>
        </div>
        <nav aria-label="Principal móvil">{links}</nav>
        <Button
          href={whatsapp()}
          target="_blank"
          rel="noopener"
          onClick={() => setOpen(false)}
        >
          Consultar por WhatsApp <Icon />
        </Button>
        <p>Hecho en Costa Rica · Desde 1974</p>
      </dialog>
    </>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <Brand />
        <p>
          Desde 1974, seguimos dando
          <br />
          nuevas puntadas a nuestra historia.
        </p>
        <a href={asset("tarjeta-85x55mm.pdf")} download>
          Tarjeta de presentación <Icon />
        </a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Modas Laura · Costa Rica</span>
        <span>Un negocio familiar de {site.owner}.</span>
        <a href={routeUrl("privacidad/")}>Privacidad</a>
      </div>
    </footer>
  );
}
