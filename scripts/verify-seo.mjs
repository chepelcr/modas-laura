import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pageEntries, pagePaths } from "../src/i18n/routes.js";
import { site } from "../src/content/site.js";

const decode = (value) =>
  value.replace(
    /&(?:amp|quot|lt|gt|#39);/g,
    (entity) =>
      ({ "&amp;": "&", "&quot;": '"', "&lt;": "<", "&gt;": ">", "&#39;": "'" })[
        entity
      ],
  );
const attributes = (tag) =>
  Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)\s*=\s*(["'])([\s\S]*?)\2/g)].map((match) => [
      match[1],
      decode(match[3]),
    ]),
  );
const tags = (html, tag) =>
  [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>`, "g"))].map((match) =>
    attributes(match[0]),
  );
const canonical = (page, locale) =>
  new URL(`/${pagePaths[locale][page]}`, site.canonical).href;

export function verifySeo({ built = false } = {}) {
  const directory = resolve(built ? "dist" : ".");
  const assetRoot = resolve(built ? "dist" : "public");
  const documents = new Map(
    Object.entries(pageEntries).map(([file, [page, locale]]) => [
      canonical(page, locale),
      readFileSync(resolve(directory, file), "utf8"),
    ]),
  );
  const titles = new Set();
  const descriptions = new Set();
  let checkedAssets = 0;
  for (const [file, [page, locale]] of Object.entries(pageEntries)) {
    const expected = canonical(page, locale);
    const html = documents.get(expected);
    const title = decode(html.match(/<title>([^<]+)<\/title>/)?.[1] || "");
    const metas = tags(html, "meta");
    const meta = (key) =>
      metas.filter((entry) => entry.name === key || entry.property === key);
    const content = (key) => {
      const found = meta(key);
      assert.equal(found.length, 1, `${file}: ${key}`);
      return found[0].content;
    };
    const links = tags(html, "link");
    assert(title && !titles.has(title), `${file}: title must be unique`);
    titles.add(title);
    const description = content("description");
    assert(
      description && !descriptions.has(description),
      `${file}: description must be unique`,
    );
    descriptions.add(description);
    assert.equal(
      links.filter((entry) => entry.rel === "canonical").length,
      1,
      `${file}: one canonical`,
    );
    assert.equal(
      links.find((entry) => entry.rel === "canonical").href,
      expected,
      `${file}: canonical`,
    );
    assert(
      !new URL(expected).search && !new URL(expected).hash,
      `${file}: clean canonical`,
    );
    assert(
      html.includes(`<html lang="${locale === "es" ? "es-CR" : "en"}"`),
      `${file}: document language`,
    );
    assert.equal(content("og:title"), title);
    assert.equal(content("og:description"), description);
    assert.equal(content("og:url"), expected);
    assert.equal(content("og:locale"), locale === "es" ? "es_CR" : "en_US");
    assert.equal(content("twitter:card"), "summary_large_image");
    assert.equal(content("twitter:title"), title);
    assert.equal(content("twitter:description"), description);
    assert.equal(content("twitter:image"), content("og:image"));
    assert(content("twitter:image:alt") && content("og:image:alt"));
    assert.equal(content("og:image:width"), "1200");
    assert.equal(content("og:image:height"), "630");
    const image = new URL(content("og:image"));
    assert.equal(image.origin, new URL(site.canonical).origin);
    assert(
      existsSync(resolve(assetRoot, image.pathname.slice(1))),
      `${file}: share image exists`,
    );
    checkedAssets++;
    const alternates = links.filter(
      (entry) => entry.rel === "alternate" && entry.hreflang,
    );
    assert.equal(
      alternates.length,
      3,
      `${file}: exactly three language alternates`,
    );
    assert.deepEqual(
      Object.fromEntries(
        alternates.map((entry) => [entry.hreflang, entry.href]),
      ),
      {
        "es-CR": canonical(page, "es"),
        en: canonical(page, "en"),
        "x-default": canonical(page, "es"),
      },
      `${file}: reciprocal language alternates`,
    );
    if (page === "notfound") assert.equal(content("robots"), "noindex");
    else
      assert(
        !meta("robots").some((entry) =>
          /noindex|nofollow|none/i.test(entry.content),
        ),
        `${file}: public page is indexable`,
      );
    const schemas = [
      ...html.matchAll(
        /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
      ),
    ].map((match) => JSON.parse(match[1]));
    assert.equal(schemas.length, 1, `${file}: organization schema`);
    const organization = schemas[0];
    assert.equal(organization["@context"], "https://schema.org");
    assert.equal(organization["@type"], "Organization");
    assert.equal(organization.name, site.name);
    assert.equal(organization.url, site.canonical);
    assert.equal(organization.foundingDate, site.since);
    assert.equal(organization.email, site.email);
    assert.equal(organization.telephone, site.phoneInternational);
    assert(
      !/rating|review|price|openingHours|offers/i.test(
        JSON.stringify(organization),
      ),
      `${file}: no unverified commercial claims`,
    );
    assert(
      existsSync(
        resolve(assetRoot, new URL(organization.logo).pathname.slice(1)),
      ),
      `${file}: organization logo exists`,
    );
    if (built) {
      assert(
        (html.match(/<h1\b/g) || []).length === 1,
        `${file}: one prerendered heading`,
      );
      assert(
        !html.includes('<div id="root"></div>'),
        `${file}: content prerendered`,
      );
      if (file.endsWith("/index.html"))
        assert.equal(
          readFileSync(
            resolve(directory, file.replace(/\/index\.html$/, ".html")),
            "utf8",
          ),
          html,
          `${file}: clean-path HTML alias`,
        );
      for (const link of tags(html, "a")) {
        if (!link.href) continue;
        const url = new URL(link.href, expected);
        if (url.origin !== new URL(site.canonical).origin) continue;
        const destination = url.pathname.replace(/\/+$/, "") || "/";
        const known = documents.get(new URL(destination, site.canonical).href);
        if (!known)
          assert(
            existsSync(
              resolve(assetRoot, decodeURIComponent(url.pathname.slice(1))),
            ),
            `${file}: broken local link ${url.pathname}`,
          );
        else if (url.hash)
          assert(
            known.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),
            `${file}: missing linked fragment ${url.hash}`,
          );
      }
    }
  }
  const sitemap = readFileSync(
    resolve(built ? directory : assetRoot, "sitemap.xml"),
    "utf8",
  );
  assert(
    sitemap.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'),
  );
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) =>
    decode(match[1]),
  );
  const expected = Object.values(pageEntries)
    .filter(([page]) => page !== "notfound")
    .map(([page, locale]) => canonical(page, locale));
  assert.equal(
    new Set(urls).size,
    urls.length,
    "Sitemap contains no duplicates",
  );
  assert.deepEqual(
    [...urls].sort(),
    expected.sort(),
    "Sitemap covers every indexable route and excludes 404s",
  );
  const robots = readFileSync(
    resolve(built ? directory : assetRoot, "robots.txt"),
    "utf8",
  );
  assert.match(robots, /User-agent:\s*\*/i);
  assert.match(robots, /Allow:\s*\//i);
  assert(!/^Disallow:\s*\S/m.test(robots), "No public assets or pages blocked");
  assert(robots.includes(`Sitemap: ${site.canonical}sitemap.xml`));
  if (built) {
    assert(
      documents
        .get(canonical("privacy", "es"))
        .includes("analítica propia y anónima"),
    );
    assert(
      documents
        .get(canonical("privacy", "en"))
        .includes("anonymous first-party analytics"),
    );
    assert(
      ![...documents.values()].some((html) =>
        /admin\.modas-laura|ml-session|cognito-idp|AKIA[A-Z0-9]{16}/.test(html),
      ),
      "No private library credentials or internals in public documents",
    );
  }
  const summary = {
    routes: Object.keys(pageEntries).length,
    indexableRoutes: urls.length,
    locales: 2,
    shareImagesVerified: checkedAssets,
    prerendered: built,
  };
  if (built) console.log("SEO verified:", JSON.stringify(summary));
  return summary;
}
