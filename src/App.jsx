import Corporate from "./pages/Corporate.jsx";
import Designs from "./pages/Designs.jsx";
import Collection from "./pages/Collection.jsx";
import Contact from "./pages/Contact.jsx";
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
import { LocaleProvider, useLocale } from "./i18n/LocaleContext.jsx";
import { ThemeProvider } from "./design-system/ThemeContext.jsx";
import { usePageMotion } from "./hooks/usePageMotion.js";
function NotFound() {
  const { t, routeUrl } = useLocale();
  return (
    <Container as="main" id="contenido" className="closing section">
      <Eyebrow>404</Eyebrow>
      <Heading as="h1">{t("Se nos fue una puntada.")}</Heading>
      <p>
        {t("No encontramos esta página. Podés volver a nuestra colección.")}
      </p>
      <Button href={routeUrl()}>{t("Volver al inicio")}</Button>
    </Container>
  );
}
function AppContent({ page = "home" }) {
  const { t } = useLocale();
  usePageMotion();
  const Page =
    {
      home: Home,
      corporate: Corporate,
      designs: Designs,
      collection: Collection,
      contact: Contact,
      history: History,
      archive: Archive,
      privacy: Privacy,
      notfound: NotFound,
    }[page] || NotFound;
  return (
    <>
      <a className="skip" href="#contenido">
        {t("Saltar al contenido")}
      </a>
      <Header page={page} />
      <Page />
      <Footer />
    </>
  );
}

export function App({ page = "home", locale = "es" }) {
  return (
    <LocaleProvider locale={locale} page={page}>
      <ThemeProvider>
        <AppContent page={page} />
      </ThemeProvider>
    </LocaleProvider>
  );
}
