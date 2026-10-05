import Home from "./pages/Home.jsx";
import History from "./pages/History.jsx";
import Archive from "./pages/Archive.jsx";
import Privacy from "./pages/Privacy.jsx";
import { Header, Footer } from "./components/SiteLayout.jsx";
import {
  Button,
  Container,
  Eyebrow,
  Heading,
} from "./design-system/Primitives.jsx";
import { routeUrl } from "./content/site.js";
import { usePageMotion } from "./hooks/usePageMotion.js";
function NotFound() {
  return (
    <Container as="main" id="contenido" className="closing section">
      <Eyebrow>404</Eyebrow>
      <Heading as="h1">Se nos fue una puntada.</Heading>
      <p>No encontramos esta página. Podés volver a nuestra colección.</p>
      <Button href={routeUrl()}>Volver al inicio</Button>
    </Container>
  );
}
export function App({ page = "home" }) {
  usePageMotion();
  const Page =
    {
      home: Home,
      history: History,
      archive: Archive,
      privacy: Privacy,
      notfound: NotFound,
    }[page] || NotFound;
  return (
    <>
      <a className="skip" href="#contenido">
        Saltar al contenido
      </a>
      <Header page={page} />
      <Page />
      <Footer />
    </>
  );
}
