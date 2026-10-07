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
import { usePageNavigation } from "./hooks/usePageNavigation.js";
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
function AppContent({ page = "home", routeKey, content }) {
  const { t } = useLocale();
  usePageMotion(routeKey);
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
      <div className="page-content" ref={content}>
        <Page key={routeKey} />
      </div>
      <Footer />
    </>
  );
}

export function App({ page = "home", locale = "es" }) {
  const { route, content } = usePageNavigation(page, locale);
  return (
    <LocaleProvider locale={route.locale} page={route.page}>
      <ThemeProvider>
        <AppContent page={route.page} routeKey={route.key} content={content} />
      </ThemeProvider>
    </LocaleProvider>
  );
}
