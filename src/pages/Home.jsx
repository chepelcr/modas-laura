import { Button, Heading, Icon } from "../design-system/Primitives.jsx";
import { asset, site, whatsapp } from "../content/site.js";
import { useLocale } from "../i18n/LocaleContext.jsx";
import { ProductGrid } from "../components/ProductCard.jsx";
import { ConsultationSteps } from "../components/ConsultationSteps.jsx";
import { PortraitLabel } from "../components/PortraitLabel.jsx";
export default function Home() {
  const { t, routeUrl } = useLocale();
  return (
    <main id="contenido">
      <section className="hero wrap">
        <div className="hero-copy reveal" data-reveal="">
          <span className="eyebrow">
            <span className="dot"></span>
            {t(" Hecho en Costa Rica · Desde 1974")}
          </span>
          <Heading as="h1">
            {t("Pequeños detalles.")}
            <br />
            <em>{t("Una gran historia.")}</em>
          </Heading>
          <p>
            {t(
              "Almohadas y fundas para bebé y hogar, con la historia de una empresa familiar costarricense detrás de cada puntada.",
            )}
          </p>
          <div className="hero-actions">
            <Button href="#coleccion" variant="primary">
              {t("Descubrí la colección ")}
              <Icon name="arrow" />
            </Button>
            <Button href={routeUrl("historia/")} variant="text">
              {t("Conocé nuestra historia ")}
              <Icon name="arrow" />
            </Button>
          </div>
          <div className="hero-signature">
            <span className="signature-line"></span>
            <span>{t("Un legado de doña Vilma Corella Artavia.")}</span>
          </div>
        </div>
        <figure className="hero-visual reveal" data-reveal="">
          <div className="hero-frame">
            <img
              src={asset("hero-1974.webp")}
              width="1200"
              height="1500"
              alt={t(
                "Composición ilustrativa de una almohadita celeste con encaje, inspirada en nuestro archivo.",
              )}
              fetchPriority="high"
            />
            <div className="heritage-seal">
              <span className="seal-heading">
                {t("Una historia")}
                <br />
                {t("desde")}
              </span>
              <strong>{t("1974")}</strong>
              <span>{t("Costa Rica")}</span>
            </div>
          </div>
          <figcaption>
            {t("Detalles que cuentan nuestra historia. ")}
            <span>{t("Composición ilustrativa.")}</span>
          </figcaption>
        </figure>
      </section>
      <div className="brand-band">
        <span>{t("Almohadas para bebé")}</span>
        <span className="asterisk">
          <Icon name="stitch" />
        </span>
        <span>{t("Fundas para el hogar")}</span>
        <span className="asterisk">
          <Icon name="stitch" />
        </span>
        <span>{t("Una empresa familiar")}</span>
        <span className="asterisk">
          <Icon name="stitch" />
        </span>
        <span>{t("Desde 1974")}</span>
      </div>
      <section id="coleccion" className="collection section">
        <div className="wrap">
          <div className="section-heading split">
            <div>
              <span className="eyebrow">{t("Nuestra colección actual")}</span>
              <Heading as="h2">
                {t("Tres líneas para")}
                <br />
                <em>{t("seguir nuestra historia.")}</em>
              </Heading>
            </div>
            <p>
              {t("Almohadas y fundas, con opciones")}
              <br />
              {t("para bebé y para el hogar.")}
            </p>
          </div>
          <ProductGrid />
          <p className="caption">
            {t(
              "Las fotografías muestran ejemplos de nuestras líneas. Confirmá modelos, medidas, composición, precios y disponibilidad antes de comprar.",
            )}
          </p>
        </div>
      </section>
      <section className="story-preview section">
        <div className="wrap story-grid">
          <figure className="portrait reveal" data-reveal="">
            <div className="portrait-image">
              <img
                src={asset("vilma.webp")}
                width="640"
                height="640"
                alt={t(
                  "Doña Vilma Corella Artavia, propietaria de Modas Laura.",
                )}
                loading="lazy"
              />
              <PortraitLabel>
                {t("La persona detrás de la historia")}
              </PortraitLabel>
            </div>
            <figcaption>{t("Doña Vilma Corella Artavia")}</figcaption>
          </figure>
          <div className="story-copy reveal" data-reveal="">
            <span className="eyebrow">{t("Nuestra historia")}</span>
            <Heading as="h2">
              {t("Todo empezó con")}
              <br />
              <em>{t("una idea de doña Vilma.")}</em>
            </Heading>
            <p>
              {t(
                "Al ver unos vestidos en un Más por Menos, doña Vilma se animó a preparar sus propias muestras. Lo que imaginaba como un pedido para una tienda terminó llegando a los Más por Menos de todo el país.",
              )}
            </p>
            <p>
              {t(
                "Desde 1974, su iniciativa sigue dando forma a Modas Laura: una historia familiar que hoy da una nueva puntada hacia el mundo digital.",
              )}
            </p>
            <Button href={routeUrl("historia/")} variant="text">
              {t("Leé la historia completa ")}
              <Icon name="arrow" />
            </Button>
          </div>
        </div>
      </section>
      <ConsultationSteps />
      <section className="archive-preview section">
        <div className="wrap">
          <div className="section-heading split">
            <div>
              <span className="eyebrow">{t("Memoria de nuestro taller")}</span>
              <Heading as="h2">
                {t("Lo que hicimos")}
                <br />
                <em>{t("también cuenta quiénes somos.")}</em>
              </Heading>
            </div>
            <Button href={routeUrl("archivo/")} variant="text">
              {t("Explorá el archivo ")}
              <Icon name="arrow" />
            </Button>
          </div>
          <div className="archive-strip">
            <a
              href={routeUrl("archivo/#cogeollas")}
              className="archive-teaser reveal"
            >
              <img
                src={asset("archivo-cogeollas.webp")}
                width="1600"
                height="1200"
                loading="lazy"
                alt={t("Cogeollas de distintos colores del archivo familiar.")}
              />
              <span>
                {t("Para el hogar ")}
                <small>{t("Cogeollas")}</small>
              </span>
            </a>
            <a
              href={routeUrl("archivo/#sabana")}
              className="archive-teaser reveal"
            >
              <img
                src={asset("archivo-sabana.webp")}
                width="1600"
                height="1200"
                loading="lazy"
                alt={t(
                  "Juego de sábana de cuna con dos fundas, producto histórico.",
                )}
              />
              <span>
                {t("Para los más pequeños ")}
                <small>{t("Sábanas de cuna")}</small>
              </span>
            </a>
            <a
              href={routeUrl("archivo/#almohada-infantil")}
              className="archive-teaser reveal"
            >
              <img
                src={asset("archivo-almohada-infantil.webp")}
                width="1600"
                height="1200"
                loading="lazy"
                alt={t(
                  "Almohada infantil de mayor tamaño, del archivo histórico.",
                )}
              />
              <span>
                {t("Otras etapas ")}
                <small>{t("Almohada infantil")}</small>
              </span>
            </a>
          </div>
          <p className="caption">
            {t(
              "Productos históricos. Fotografías del archivo familiar restauradas con apoyo de IA; algunos detalles pueden haber sido reconstruidos.",
            )}
          </p>
        </div>
      </section>
      <section id="contacto" className="contact section">
        <div className="wrap contact-grid">
          <div>
            <span className="eyebrow">{t("Sigamos en contacto")}</span>
            <Heading as="h2">
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
    </main>
  );
}
