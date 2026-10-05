import { Button, Heading, Icon } from "../design-system/Primitives.jsx";
import { asset } from "../content/site.js";
import { useLocale } from "../i18n/LocaleContext.jsx";
export default function Privacy() {
  const { t, routeUrl } = useLocale();
  return (
    <main id="contenido" className="wrap legal">
      <a className="back-link" href={routeUrl("")}>
        {t("← Volver al inicio")}
      </a>
      <span className="eyebrow">{t("Información del sitio")}</span>
      <Heading as="h1">{t("Tu privacidad.")}</Heading>
      <div className="prose">
        <Heading as="h2">{t("Una visita sencilla")}</Heading>
        <p>
          {t(
            "Este sitio no incorpora formularios, cuentas, cookies propias ni herramientas de seguimiento publicitario o analítica. Se aloja en GitHub Pages; el proveedor puede procesar información técnica de la visita conforme a sus políticas.",
          )}
        </p>
        <p>
          {t(
            "Guardamos tu preferencia de idioma y apariencia en este navegador. Podés cambiarlas desde los controles del sitio.",
          )}
        </p>
        <Heading as="h2">{t("Cuando nos contactás")}</Heading>
        <p>
          {t(
            "Los enlaces de WhatsApp, teléfono y correo abren servicios externos. Si elegís escribirnos, compartís con nosotros la información que incluyás en tu mensaje para atender tu consulta. Las condiciones de esos servicios se aplican al usarlos.",
          )}
        </p>
        <Heading as="h2">{t("Consultas")}</Heading>
        <p>
          {t("Podés escribirnos a ")}
          <a href="mailto:vilmacorella@yahoo.com">
            {t("vilmacorella@yahoo.com")}
          </a>
          {t(
            " para cualquier consulta relacionada con la información que nos compartás.",
          )}
        </p>
      </div>
    </main>
  );
}
