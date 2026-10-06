import { Container, Eyebrow, Heading } from "../design-system/Primitives.jsx";
import { asset, logoHistory } from "../content/site.js";
import { useLocale } from "../i18n/LocaleContext.jsx";

export function LogoTimeline() {
  const { t } = useLocale();
  return (
    <Container
      as="section"
      className="section logo-history"
      id="logos"
      aria-labelledby="logo-history-heading"
    >
      <Eyebrow>{t("La evolución de nuestra identidad")}</Eyebrow>
      <Heading as="h2" id="logo-history-heading">
        {t("Un bebé.")}
        <br />
        <em>{t("Tres etapas de nuestra historia.")}</em>
      </Heading>
      <p className="logo-history-intro">
        {t(
          "Los símbolos cambian y nuestras raíces permanecen. Estas etapas reúnen los logos conservados por la familia; no contamos con fechas exactas para las versiones históricas.",
        )}
      </p>
      <ol className="logo-history-list">
        {logoHistory.map((entry, index) => (
          <li key={entry.id} data-reveal>
            <div className="logo-history-stage">
              <span aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <Eyebrow>{t(entry.stage)}</Eyebrow>
            </div>
            <figure
              className={`logo-history-image ${entry.id}${entry.darkImage ? " current" : ""}`}
            >
              <img
                className={entry.darkImage ? "brand-light" : undefined}
                src={asset(entry.image)}
                alt={t(entry.alt)}
                width={entry.id === "logo-circular" ? 600 : 900}
                height={
                  entry.id === "logo-circular"
                    ? 600
                    : entry.darkImage
                      ? 300
                      : 600
                }
                loading="lazy"
              />
              {entry.darkImage && (
                <img
                  className="brand-dark"
                  src={asset(entry.darkImage)}
                  alt=""
                  aria-hidden="true"
                  width="900"
                  height="300"
                  loading="lazy"
                />
              )}
            </figure>
            <Heading as="h3">{t(entry.title)}</Heading>
            <p>{t(entry.description)}</p>
            <small>{t(entry.note)}</small>
          </li>
        ))}
      </ol>
    </Container>
  );
}
