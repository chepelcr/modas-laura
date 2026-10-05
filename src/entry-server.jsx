import { renderToString } from "react-dom/server";
import { App } from "./App.jsx";
export function render(page, locale = "es") {
  return renderToString(<App page={page} locale={locale} />);
}
