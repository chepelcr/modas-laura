import { hydrateRoot } from "react-dom/client";
import { App } from "./App.jsx";
import { pagePaths } from "./i18n/LocaleContext.jsx";
import { startAnalytics } from "./analytics.js";
import "./styles.css";
import "./design-system/tokens.css";
hydrateRoot(
  document.getElementById("root"),
  <App
    page={document.body.dataset.page}
    locale={document.body.dataset.locale || "es"}
  />,
);

startAnalytics({
  publicPaths: Object.values(pagePaths).flatMap((pages) =>
    Object.values(pages).map((path) => `/${path}`),
  ),
});
