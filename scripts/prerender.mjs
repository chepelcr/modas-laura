import { readFile, writeFile } from "node:fs/promises";
import { render } from "../.ssr/entry-server.js";
const routes = {
  "index.html": "home",
  "historia/index.html": "history",
  "archivo/index.html": "archive",
  "privacidad/index.html": "privacy",
  "404.html": "notfound",
};
for (const [file, page] of Object.entries(routes)) {
  const path = new URL(`../dist/${file}`, import.meta.url);
  const template = await readFile(path, "utf8");
  await writeFile(
    path,
    template.replace(
      '<div id="root"></div>',
      `<div id="root">${render(page)}</div>`,
    ),
  );
}
console.log(
  "5 páginas React prerenderizadas con contenido, metadata y enlaces directos.",
);
