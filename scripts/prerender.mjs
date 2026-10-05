import { readFile, writeFile } from "node:fs/promises";
import { render } from "../.ssr/entry-server.js";
const routes = {
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
  await writeFile(
    path,
    template.replace(
      '<div id="root"></div>',
      `<div id="root">${render(page, locale)}</div>`,
    ),
  );
}
console.log("10 entradas React prerenderizadas en español e inglés.");
