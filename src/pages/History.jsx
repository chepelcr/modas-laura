import { Button, Heading, Icon } from "../design-system/Primitives.jsx";
import { asset, routeUrl } from "../content/site.js";
export default function History() {
  return (
    <main id="contenido">
      <section className="page-intro wrap">
        <a className="back-link" href={routeUrl("")}>
          {"← Volver al inicio"}
        </a>
        <span className="eyebrow">{"Un negocio familiar · Desde 1974"}</span>
        <Heading as="h1">
          {"Una iniciativa."}
          <br />
          <em>{"Toda una historia."}</em>
        </Heading>
        <p>
          {
            "La historia de Modas Laura es la historia de doña Vilma Corella Artavia y de una idea que llegó mucho más lejos de lo esperado."
          }
        </p>
      </section>
      <section className="wrap history-opening">
        <figure className="portrait">
          <img
            src={asset("vilma.webp")}
            width="640"
            height="640"
            alt="Doña Vilma Corella Artavia."
            fetchPriority="high"
          />
          <figcaption>
            {"Vilma Corella Artavia · Propietaria de Modas Laura"}
          </figcaption>
        </figure>
        <div className="prose">
          <span className="eyebrow">{"El primer paso"}</span>
          <Heading as="h2">
            {"De unas muestras"}
            <br />
            {"a todo el país."}
          </Heading>
          <p>
            {
              "Al pasar frente a un Más por Menos y ver unos vestidos, doña Vilma pensó que podía mejorar su confección. Decidió preparar sus propias muestras y presentarlas a Corporación de Supermercados Unidos, conocida entonces como CSU."
            }
          </p>
          <p>
            {
              "Imaginaba que le pedirían vestidos para el local de Cuesta de Moras. La sorpresa fue descubrir que el pedido sería para los Más por Menos de todo el país. Aquella iniciativa abrió una oportunidad mucho mayor de la que había imaginado."
            }
          </p>
          <p className="caption">
            {"Este relato forma parte de nuestra historia de origen."}
          </p>
        </div>
      </section>
      <section className="timeline-section section">
        <div className="wrap">
          <span className="eyebrow">{"Una historia que se transforma"}</span>
          <Heading as="h2">
            {"Cambiaron los productos."}
            <br />
            <em>{"La iniciativa siguió."}</em>
          </Heading>
          <div className="timeline">
            <article className="reveal" data-reveal="">
              <span className="timeline-mark">{"01"}</span>
              <div>
                <span className="micro">{"El comienzo · Desde 1974"}</span>
                <Heading as="h3">{"Vestidos y uniformes"}</Heading>
                <p>
                  {
                    "A los vestidos se sumaron los uniformes escolares para niñas y niños. La confección abrió el camino para nuevas líneas."
                  }
                </p>
              </div>
            </article>
            <article className="reveal" data-reveal="">
              <span className="timeline-mark">{"02"}</span>
              <div>
                <span className="micro">{"Nuevas líneas"}</span>
                <Heading as="h3">{"Del vestir al hogar"}</Heading>
                <p>
                  {
                    "Con el tiempo llegaron los cogeollas y los delantales de carnicero: otras maneras de acompañar la vida cotidiana."
                  }
                </p>
              </div>
            </article>
            <article className="reveal" data-reveal="">
              <span className="timeline-mark">{"03"}</span>
              <div>
                <span className="micro">
                  {"Una parte de nuestra identidad"}
                </span>
                <Heading as="h3">{"La línea para bebés y niños"}</Heading>
                <p>
                  {
                    "Sábanas de cuna con dos fundas, almohaditas y distintos estilos de fundas ampliaron la colección. También hubo una almohada infantil de mayor tamaño para niños, distinta de las almohaditas de bebé."
                  }
                </p>
              </div>
            </article>
            <article className="reveal" data-reveal="">
              <span className="timeline-mark">{"04"}</span>
              <div>
                <span className="micro">{"Hoy"}</span>
                <Heading as="h3">{"Una nueva puntada"}</Heading>
                <p>
                  {
                    "Nos concentramos en almohadas con funda, almohadas sencillas y fundas para almohada grande, blancas y de colores. Tras vivir el paso de los métodos manuales a procesos apoyados por la tecnología, nos emociona dar el siguiente paso hacia el mundo digital."
                  }
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>
      <section className="closing section wrap">
        <span className="eyebrow">{"Nuestro presente"}</span>
        <Heading as="h2">
          {"El bebé del logo."}
          <br />
          <em>{"La historia de una familia."}</em>
        </Heading>
        <p>
          {
            "El bebé conserva la conexión con una parte importante de nuestra trayectoria. Modas Laura sigue siendo el negocio familiar de doña Vilma, activo desde 1974 y hecho en Costa Rica."
          }
        </p>
        <div className="hero-actions">
          <Button href="#coleccion" variant="primary">
            {"Conocé la colección "}
            <Icon name="arrow" />
          </Button>
          <Button href={routeUrl("archivo/")} variant="text">
            {"Visitá el archivo "}
            <Icon name="arrow" />
          </Button>
        </div>
      </section>
    </main>
  );
}
