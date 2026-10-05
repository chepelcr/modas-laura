import { hydrateRoot } from "react-dom/client";
import { App } from "./App.jsx";
import "./styles.css";
import "./design-system/tokens.css";
hydrateRoot(
  document.getElementById("root"),
  <App page={document.body.dataset.page} />,
);
