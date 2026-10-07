import { Button, Heading, Icon } from "../design-system/Primitives.jsx";
import { asset, site, whatsapp } from "../content/site.js";
import { useLocale } from "../i18n/LocaleContext.jsx";
export function ContactSection({ standalone = false }) {
  const { t } = useLocale();
  return (
    <section id="contacto" className="contact section">
      <div className="wrap contact-grid">
        <div>
          <span className="eyebrow">{t("Sigamos en contacto")}</span>
          <Heading as={standalone ? "h1" : "h2"}>
            {t("El siguiente detalle")}
            <br />
            {t("lo elegimos con vos.")}
          </Heading>
          <p>
            {t(
              "Contanos qué estás buscando. Te ayudamos a consultar modelos, colores, precios y disponibilidad.",
            )}
          </p>
          <Button
            href={whatsapp(
              t("Hola Modas Laura, quisiera consultar sus productos."),
            )}
            target="_blank"
            rel="noopener"
            variant="light"
          >
            <Icon name="message" />
            {t(" Escribinos por WhatsApp ")}
            <Icon name="arrow" />
          </Button>
        </div>
        <div className="contact-info">
          <span className="eyebrow">{t("Modas Laura")}</span>
          <a href={`tel:${site.phoneInternational}`} className="phone">
            <span className="country-code">+506</span>
            <span>{site.phone}</span>
          </a>
          <a href="mailto:vilmacorella@yahoo.com" className="email">
            {t("vilmacorella@yahoo.com")}
          </a>
          <span>{t("Costa Rica")}</span>
          <Button
            href={asset("modas-laura.vcf")}
            download={true}
            variant="text"
            className="pale"
          >
            {t("Guardar contacto ")}
            <Icon name="arrow" />
          </Button>
        </div>
      </div>
    </section>
  );
}
export default function Contact() {
  return (
    <main id="contenido">
      <ContactSection standalone />
    </main>
  );
}
