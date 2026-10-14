import { readFile, writeFile } from "node:fs/promises";
import { render } from "../.ssr/entry-server.js";
import { pageEntries as routes } from "../src/i18n/routes.js";
import { verifySeo } from "./verify-seo.mjs";
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

await verifySeo({ built: true });
