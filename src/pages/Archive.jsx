import { Button, Heading, Icon } from "../design-system/Primitives.jsx";
import { asset, routeUrl } from "../content/site.js";
import { ArchiveGallery } from "../components/ArchiveGallery.jsx";
export default function Archive() {
  return (
    <main id="contenido">
      <section className="page-intro wrap">
        <a className="back-link" href={routeUrl("")}>
          {"← Volver al inicio"}
        </a>
        <span className="eyebrow">{"El archivo familiar"}</span>
        <Heading as="h1">
          {"Recuerdos de tela."}
          <br />
          <em>{"Memoria de un oficio."}</em>
        </Heading>
        <p>
          {
            "Una mirada a los productos, los detalles y el taller que han formado parte de nuestra historia."
          }
        </p>
        <div className="archive-notice">
          {
            "Estas imágenes documentan etapas anteriores; los modelos mostrados no constituyen un catálogo de disponibilidad actual. Las fotografías fueron restauradas con apoyo de IA y pueden contener detalles reconstruidos. Podés compararlas con sus originales."
          }
        </div>
      </section>
      <ArchiveGallery />
      <section className="closing section wrap">
        <span className="eyebrow">{"Nuestra colección actual"}</span>
        <Heading as="h2">
          {"Seguimos aquí."}
          <br />
          <em>{"Seguimos creando."}</em>
        </Heading>
        <Button href="#coleccion" variant="primary">
          {"Ver líneas actuales "}
          <Icon name="arrow" />
        </Button>
      </section>
    </main>
  );
}
