import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import {
  products,
  archiveEntries,
  consultationSteps,
  site,
  whatsapp,
} from "../src/content/site.js";
test("Current collection has exactly the three approved lines", () => {
  assert.deepEqual(
    products.map((item) => item.id),
    ["con-funda", "sencilla", "funda-grande"],
  );
  assert.equal(new Set(products.map((item) => item.id)).size, products.length);
  assert(!products.some((item) => item.id === "almohada-infantil"));
});
test("Every archive record has original and restored images", () => {
  assert.equal(archiveEntries.length, 10);
  for (const entry of archiveEntries) {
    assert(existsSync(`public/assets/archivo-${entry.id}.webp`));
    assert(existsSync(`public/assets/original-${entry.id}.webp`));
  }
  assert.match(
    archiveEntries.find((item) => item.id === "almohada-infantil").description,
    /distinto/,
  );
});
test("Contact and guided inquiries use the approved Costa Rican number", () => {
  assert.equal(site.phoneInternational, "+50689890512");
  assert.equal(site.email, "vilmacorella@yahoo.com");
  assert.equal(new URL(whatsapp("Hola")).pathname, "/50689890512");
  for (const step of consultationSteps.slice(1))
    assert.equal(new URL(step.href).pathname, "/50689890512");
  assert.match(
    readFileSync("public/assets/modas-laura.vcf", "utf8"),
    /vilmacorella@yahoo.com/,
  );
});
test("Every production destination has unique metadata and canonical URL", () => {
  const routes = ["", "historia/", "archivo/", "privacidad/"];
  const titles = [];
  for (const route of routes) {
    const html = readFileSync(`${route}index.html`, "utf8");
    assert(html.includes(`href="${site.canonical}${route}"`));
    titles.push(html.match(/<title>(.*?)<\/title>/)[1]);
  }
  assert.equal(new Set(titles).size, 4);
});
