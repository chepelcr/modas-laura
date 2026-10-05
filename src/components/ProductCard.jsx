import { useLocale } from "../i18n/LocaleContext.jsx";
import { Button, Card, Heading, Icon } from "../design-system/Primitives.jsx";
import { asset, products, whatsapp } from "../content/site.js";
export function ProductCard({ product }) {
  const { t } = useLocale();
  return (
    <Card
      className="product-card reveal"
      id={`producto-${product.id}`}
      data-reveal=""
    >
      <div className={`product-photo ${product.id}`}>
        <img
          src={asset(product.image)}
          alt={t(product.alt)}
          width="1600"
          height="1200"
          loading="lazy"
        />
        <span className="photo-number">{product.number}</span>
        {product.archival && (
          <span className="photo-note">{t("Foto de archivo")}</span>
        )}
        {product.illustrative && (
          <span className="photo-note">{t("Composición ilustrativa.")}</span>
        )}
      </div>
      <div className="product-copy">
        <span className="micro">{t(product.kicker)}</span>
        <Heading as="h3">{t(product.title)}</Heading>
        <p>{t(product.description)}</p>
        <Button
          variant="text"
          href={whatsapp(
            `${t("Hola Modas Laura, quisiera consultar por")} ${t(product.title).toLowerCase()}.`,
          )}
          target="_blank"
          rel="noopener"
        >
          {t("Consultar esta línea")} <Icon />
        </Button>
      </div>
    </Card>
  );
}
export function ProductGrid() {
  return (
    <div className="products-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
