import { Heading } from "../design-system/Primitives.jsx";
import { ProductGrid } from "../components/ProductCard.jsx";
import { useLocale } from "../i18n/LocaleContext.jsx";
export function CollectionSection({ standalone = false }) {
  const { t } = useLocale();
  return (
    <section id="coleccion" className="collection section">
      <div className="wrap">
        <div className="section-heading split">
          <div>
            <span className="eyebrow">{t("Nuestra colección actual")}</span>
            <Heading as={standalone ? "h1" : "h2"}>
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
  );
}
export default function Collection() {
  return (
    <main id="contenido">
      <CollectionSection standalone />
    </main>
  );
}
