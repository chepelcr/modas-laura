import { Button, Heading, Icon } from "../design-system/Primitives.jsx";
import { asset } from "../content/site.js";
import { useLocale } from "../i18n/LocaleContext.jsx";
import { ArchiveGallery } from "../components/ArchiveGallery.jsx";
import { LogoTimeline } from "../components/LogoTimeline.jsx";
export default function Archive() {
  const { t, routeUrl } = useLocale();
  return (
    <main id="contenido">
      <section className="page-intro wrap">
        <a className="back-link" href={routeUrl("")}>
          {t("← Volver al inicio")}
        </a>
        <span className="eyebrow">{t("El archivo familiar")}</span>
        <Heading as="h1">
          {t("Recuerdos de tela.")}
          <br />
          <em>{t("Memoria de un oficio.")}</em>
        </Heading>
        <p>
          {t(
            "Una mirada a los productos, los detalles y el taller que han formado parte de nuestra historia.",
          )}
        </p>
        <div className="archive-notice">
          {t(
            "Estas imágenes documentan etapas anteriores; los modelos mostrados no constituyen un catálogo de disponibilidad actual. Las fotografías fueron restauradas con apoyo de IA y pueden contener detalles reconstruidos. Podés compararlas con sus originales.",
          )}
        </div>
      </section>
      <LogoTimeline />
      <ArchiveGallery />
      <section className="closing section wrap">
        <span className="eyebrow">{t("Nuestra colección actual")}</span>
        <Heading as="h2">
          {t("Seguimos aquí.")}
          <br />
          <em>{t("Seguimos creando.")}</em>
        </Heading>
        <Button href={routeUrl("#coleccion")} variant="primary">
          {t("Ver líneas actuales ")}
          <Icon name="arrow" />
        </Button>
      </section>
    </main>
  );
}
