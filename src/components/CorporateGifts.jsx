import { Button, Heading, Icon } from "../design-system/Primitives.jsx";
import {
  asset,
  corporateCatalog,
  customDesigns,
  whatsapp,
} from "../content/site.js";
import { useLocale } from "../i18n/LocaleContext.jsx";

export function CorporateGifts({ standalone = false }) {
  const { t, routeUrl } = useLocale();
  return (
    <section id="regalos-corporativos" className="corporate-gifts section">
      <div className="wrap">
        <div className="section-heading split">
          <div>
            <span className="eyebrow">{t("Regalos corporativos")}</span>
            <Heading as={standalone ? "h1" : "h2"}>
              {t("Tu marca,")}
              <br />
              <em>{t("en cada detalle.")}</em>
            </Heading>
          </div>
          <p>
            {t(
              "Almohaditas personalizadas para regalos de empresa. Explorá cinco estilos y contanos qué diseño, cantidad y fecha tenés en mente.",
            )}
          </p>
        </div>
        <div className="corporate-actions">
          <Button
            href={whatsapp(
              t(
                "Hola Modas Laura, quisiera consultar regalos corporativos personalizados.",
              ),
            )}
            target="_blank"
            rel="noopener"
          >
            {t("Consultar un regalo corporativo")} <Icon name="arrow" />
          </Button>
          <Button href={asset(corporateCatalog.pdf)} download variant="text">
            {t("Descargar catálogo (PDF, español)")} <Icon name="arrow" />
          </Button>
          <Button href={routeUrl("disenos-personalizados/")} variant="text">
            {t("Ver diseños personalizados")} <Icon name="arrow" />
          </Button>
        </div>
        <div className="corporate-styles">
          {corporateCatalog.styles.map((style) => (
            <article
              className="corporate-style reveal"
              data-reveal=""
              key={style.id}
            >
              <div className="corporate-photo">
                <img
                  src={asset(style.image)}
                  alt={t(style.alt)}
                  width="800"
                  height="650"
                  loading="lazy"
                />
              </div>
              <span className="eyebrow">{t(style.title)}</span>
              <Heading as="h3">{t(style.size)}</Heading>
              <p>
                {t(style.measurementLabel)}
                <br />
                {t(style.description)}
              </p>
              <Button
                variant="text"
                href={whatsapp(
                  `${t("Hola Modas Laura, quisiera consultar un regalo corporativo:")} ${t(style.title)}, ${t(style.size)}.`,
                )}
                target="_blank"
                rel="noopener"
              >
                {t("Consultá este estilo")} <Icon name="arrow" />
              </Button>
            </article>
          ))}
        </div>
        <p className="caption">
          {t(
            "Estilos 1, 2 y 3: propuestas ilustrativas con nuestro logo, editadas con IA. Estilos 4 y 5: fotografías de trabajos realizados con el fondo eliminado con IA.",
          )}{" "}
          {t(
            "Confirmá diseño, materiales, cantidades, precios, disponibilidad y fecha antes de encargar.",
          )}
        </p>
      </div>
    </section>
  );
}

export function CustomDesigns({ standalone = false }) {
  const { t } = useLocale();
  return (
    <section id="disenos-personalizados" className="custom-designs section">
      <div className="wrap">
        <span className="eyebrow">{t("Trabajos realizados")}</span>
        <Heading as={standalone ? "h1" : "h2"}>
          {t("Diseños personalizados")}
        </Heading>
        <div className="custom-design-grid">
          {customDesigns.map((design) => (
            <figure key={design.id}>
              <a href={asset(design.image)} target="_blank" rel="noopener">
                <img
                  src={asset(design.image)}
                  alt={t(design.title)}
                  width="1200"
                  height="900"
                  loading="lazy"
                />
              </a>
              <figcaption>
                {t(design.title)}
                {design.backgroundRemoved && (
                  <>
                    <br />
                    <small>{t("Fondo eliminado con IA.")}</small>
                    <br />
                    <a
                      href={asset(design.originalImage)}
                      target="_blank"
                      rel="noopener"
                    >
                      {t("Ver foto original")}
                    </a>
                  </>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="caption">
          {t(
            "Fotografías de trabajos realizados, con marcas y nombres personalizados. Algunas imágenes tienen el fondo eliminado con IA y enlazan a su foto original. Las marcas pertenecen a sus respectivos titulares; estos ejemplos no implican una relación comercial actual.",
          )}
        </p>
      </div>
    </section>
  );
}
