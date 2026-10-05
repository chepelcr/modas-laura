import { Button, Card, Heading, Icon } from "../design-system/Primitives.jsx";
import { asset, products, whatsapp } from "../content/site.js";
export function ProductCard({ product }) {
  return (
    <Card
      className="product-card reveal"
      id={`producto-${product.id}`}
      data-reveal=""
    >
      <div className={`product-photo ${product.id}`}>
        <img
          src={asset(product.image)}
          alt={product.alt}
          width="1600"
          height="1200"
          loading="lazy"
        />
        <span className="photo-number">{product.number}</span>
        {product.archival && (
          <span className="photo-note">Foto de archivo</span>
        )}
      </div>
      <div className="product-copy">
        <span className="micro">{product.kicker}</span>
        <Heading as="h3">{product.title}</Heading>
        <p>{product.description}</p>
        <Button
          variant="text"
          href={whatsapp(
            `Hola Modas Laura, quisiera consultar por ${product.title.toLowerCase()}.`,
          )}
          target="_blank"
          rel="noopener"
        >
          Consultar esta línea <Icon />
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
