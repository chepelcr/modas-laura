import { readFile, writeFile } from "node:fs/promises";
import { render } from "../.ssr/entry-server.js";
const routes = {
  "en/contact/index.html": ["contact", "en"],
  "contacto/index.html": ["contact", "es"],
  "en/collection/index.html": ["collection", "en"],
  "coleccion/index.html": ["collection", "es"],
  "en/personalized-designs/index.html": ["designs", "en"],
  "disenos-personalizados/index.html": ["designs", "es"],
  "en/corporate-gifts/index.html": ["corporate", "en"],
  "regalos-corporativos/index.html": ["corporate", "es"],
  "index.html": ["home", "es"],
  "historia/index.html": ["history", "es"],
  "archivo/index.html": ["archive", "es"],
  "privacidad/index.html": ["privacy", "es"],
  "404.html": ["notfound", "es"],
  "en/index.html": ["home", "en"],
  "en/history/index.html": ["history", "en"],
  "en/archive/index.html": ["archive", "en"],
  "en/privacy/index.html": ["privacy", "en"],
  "en/404.html": ["notfound", "en"],
};
for (const [file, [page, locale]] of Object.entries(routes)) {
  const path = new URL(`../dist/${file}`, import.meta.url);
  const template = await readFile(path, "utf8");
  const html = template.replace(
    '<div id="root"></div>',
    `<div id="root">${render(page, locale)}</div>`,
  );
  await writeFile(path, html);
  if (file.endsWith("/index.html")) {
    await writeFile(
      new URL(
        `../dist/${file.replace(/\/index\.html$/, ".html")}`,
        import.meta.url,
      ),
      html,
    );
  }
}
console.log(
  `${Object.keys(routes).length} entradas React prerenderizadas en español e inglés.`,
);
