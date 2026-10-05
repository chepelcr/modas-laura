import { Button, Heading, Icon } from "../design-system/Primitives.jsx";
import { asset, routeUrl } from "../content/site.js";
export default function Privacy() {
  return (
    <main id="contenido" className="wrap legal">
      <a className="back-link" href={routeUrl("")}>
        {"← Volver al inicio"}
      </a>
      <span className="eyebrow">{"Información del sitio"}</span>
      <Heading as="h1">{"Tu privacidad."}</Heading>
      <div className="prose">
        <Heading as="h2">{"Una visita sencilla"}</Heading>
        <p>
          {
            "Este sitio no incorpora formularios, cuentas, cookies propias ni herramientas de seguimiento publicitario o analítica. Se aloja en GitHub Pages; el proveedor puede procesar información técnica de la visita conforme a sus políticas."
          }
        </p>
        <Heading as="h2">{"Cuando nos contactás"}</Heading>
        <p>
          {
            "Los enlaces de WhatsApp, teléfono y correo abren servicios externos. Si elegís escribirnos, compartís con nosotros la información que incluyás en tu mensaje para atender tu consulta. Las condiciones de esos servicios se aplican al usarlos."
          }
        </p>
        <Heading as="h2">{"Consultas"}</Heading>
        <p>
          {"Podés escribirnos a "}
          <a href="mailto:vilmacorella@yahoo.com">{"vilmacorella@yahoo.com"}</a>
          {
            " para cualquier consulta relacionada con la información que nos compartás."
          }
        </p>
      </div>
    </main>
  );
}
