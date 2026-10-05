import { Button, Heading, Icon } from "../design-system/Primitives.jsx";
import { asset, routeUrl } from "../content/site.js";
import { ProductGrid } from "../components/ProductCard.jsx";
import { ConsultationSteps } from "../components/ConsultationSteps.jsx";
export default function Home() {
  return (
    <main id="contenido">
      <section className="hero wrap">
        <div className="hero-copy reveal" data-reveal="">
          <span className="eyebrow">
            <span className="dot"></span>
            {" Hecho en Costa Rica · Desde 1974"}
          </span>
          <Heading as="h1">
            {"Pequeños detalles."}
            <br />
            <em>{"Una gran historia."}</em>
          </Heading>
          <p>
            {
              "Almohadas y fundas para bebé y hogar, con la historia de una empresa familiar costarricense detrás de cada puntada."
            }
          </p>
          <div className="hero-actions">
            <Button href="#coleccion" variant="primary">
              {"Descubrí la colección "}
              <Icon name="arrow" />
            </Button>
            <Button href={routeUrl("historia/")} variant="text">
              {"Conocé nuestra historia "}
              <Icon name="arrow" />
            </Button>
          </div>
          <div className="hero-signature">
            <span className="signature-line"></span>
            <span>{"Un legado de doña Vilma Corella Artavia."}</span>
          </div>
        </div>
        <figure className="hero-visual reveal" data-reveal="">
          <div className="hero-frame">
            <img
              src={asset("portada.webp")}
              width="1600"
              height="533"
              alt="Composición ilustrativa: almohadita con encaje, almohada sencilla verde y funda blanca para almohada grande."
              fetchPriority="high"
            />
            <div className="heritage-seal">
              <span>{"Una historia desde"}</span>
              <strong>{"1974"}</strong>
              <span>{"Costa Rica"}</span>
            </div>
          </div>
          <figcaption>
            {"Tres líneas. Una misma historia. "}
            <span>{"Composición ilustrativa."}</span>
          </figcaption>
        </figure>
      </section>
      <div className="brand-band">
        <span>{"Almohadas para bebé"}</span>
        <span className="asterisk">
          <Icon name="stitch" />
        </span>
        <span>{"Fundas para el hogar"}</span>
        <span className="asterisk">
          <Icon name="stitch" />
        </span>
        <span>{"Una empresa familiar"}</span>
        <span className="asterisk">
          <Icon name="stitch" />
        </span>
        <span>{"Desde 1974"}</span>
      </div>
      <section id="coleccion" className="collection section">
        <div className="wrap">
          <div className="section-heading split">
            <div>
              <span className="eyebrow">{"Nuestra colección actual"}</span>
              <Heading as="h2">
                {"Tres líneas para"}
                <br />
                <em>{"seguir nuestra historia."}</em>
              </Heading>
            </div>
            <p>
              {"Almohadas y fundas, con opciones"}
              <br />
              {"para bebé y para el hogar."}
            </p>
          </div>
          <ProductGrid />
          <p className="caption">
            {
              "Las fotografías muestran ejemplos de nuestras líneas. Confirmá modelos, medidas, composición, precios y disponibilidad antes de comprar."
            }
          </p>
        </div>
      </section>
      <section className="story-preview section">
        <div className="wrap story-grid">
          <figure className="portrait reveal" data-reveal="">
            <img
              src={asset("vilma.webp")}
              width="640"
              height="640"
              alt="Doña Vilma Corella Artavia, propietaria de Modas Laura."
              loading="lazy"
            />
            <figcaption>{"Doña Vilma Corella Artavia"}</figcaption>
            <span className="portrait-tag">
              {"La persona detrás de la historia"}
            </span>
          </figure>
          <div className="story-copy reveal" data-reveal="">
            <span className="eyebrow">{"Nuestra historia"}</span>
            <Heading as="h2">
              {"Todo empezó con"}
              <br />
              <em>{"una idea de doña Vilma."}</em>
            </Heading>
            <p>
              {
                "Al ver unos vestidos en un Más por Menos, doña Vilma se animó a preparar sus propias muestras. Lo que imaginaba como un pedido para una tienda terminó llegando a los Más por Menos de todo el país."
              }
            </p>
            <p>
              {
                "Desde 1974, su iniciativa sigue dando forma a Modas Laura: una historia familiar que hoy da una nueva puntada hacia el mundo digital."
              }
            </p>
            <Button href={routeUrl("historia/")} variant="text">
              {"Leé la historia completa "}
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
              <span className="eyebrow">{"Memoria de nuestro taller"}</span>
              <Heading as="h2">
                {"Lo que hicimos"}
                <br />
                <em>{"también cuenta quiénes somos."}</em>
              </Heading>
            </div>
            <Button href={routeUrl("archivo/")} variant="text">
              {"Explorá el archivo "}
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
                alt="Cogeollas de distintos colores del archivo familiar."
              />
              <span>
                {"Para el hogar "}
                <small>{"Cogeollas"}</small>
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
                alt="Juego de sábana de cuna con dos fundas, producto histórico."
              />
              <span>
                {"Para los más pequeños "}
                <small>{"Sábanas de cuna"}</small>
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
                alt="Almohada infantil de mayor tamaño, del archivo histórico."
              />
              <span>
                {"Otras etapas "}
                <small>{"Almohada infantil"}</small>
              </span>
            </a>
          </div>
          <p className="caption">
            {
              "Productos históricos. Fotografías del archivo familiar restauradas con apoyo de IA; algunos detalles pueden haber sido reconstruidos."
            }
          </p>
        </div>
      </section>
      <section id="contacto" className="contact section">
        <div className="wrap contact-grid">
          <div>
            <span className="eyebrow">{"Sigamos en contacto"}</span>
            <Heading as="h2">
              {"El siguiente detalle"}
              <br />
              {"lo elegimos con vos."}
            </Heading>
            <p>
              {
                "Contanos qué estás buscando. Te ayudamos a consultar modelos, colores, precios y disponibilidad."
              }
            </p>
            <Button
              href="https://wa.me/50689890512?text=Hola%20Modas%20Laura%2C%20quisiera%20consultar%20sus%20productos."
              target="_blank"
              rel="noopener"
              variant="light"
            >
              <Icon name="message" />
              {" Escribinos por WhatsApp "}
              <Icon name="arrow" />
            </Button>
          </div>
          <div className="contact-info">
            <span className="eyebrow">{"Modas Laura"}</span>
            <a href="tel:+50689890512" className="phone">
              {"8989-0512"}
            </a>
            <a href="mailto:vilmacorella@yahoo.com" className="email">
              {"vilmacorella@yahoo.com"}
            </a>
            <span>{"Costa Rica · +506"}</span>
            <Button
              href={asset("modas-laura.vcf")}
              download={true}
              variant="text"
              className="pale"
            >
              {"Guardar contacto "}
              <Icon name="arrow" />
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
