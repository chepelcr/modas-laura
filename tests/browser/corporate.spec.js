import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const [home, corporate, designs, heading, link] of [
  [
    "./",
    "regalos-corporativos/",
    "disenos-personalizados/",
    "Tu marca, en cada detalle.",
    "Ver diseños personalizados",
  ],
  [
    "en/",
    "en/corporate-gifts/",
    "en/personalized-designs/",
    "Your brand, in every detail.",
    "View personalized designs",
  ],
]) {
  test(`Dedicated corporate page and designs work in ${home}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 900 });
    await page.goto(home);
    await expect(
      page.locator("#regalos-corporativos, #disenos-personalizados"),
    ).toHaveCount(0);
    await expect(
      page.locator(
        '#mobile-menu a[href$="/disenos-personalizados"], #mobile-menu a[href$="/personalized-designs"]',
      ),
    ).toHaveCount(1);
    await page.goto(corporate);
    await expect(page.locator("h1")).toHaveAccessibleName(heading);
    await expect(page.locator(".corporate-style")).toHaveCount(5);
    await expect(page.locator("#disenos-personalizados")).toHaveCount(0);
    await expect(page.locator("main")).not.toContainText(/\b(?:IA|AI)\b/);
    expect(
      await page
        .locator(".corporate-style")
        .evaluateAll((cards) =>
          cards.every(
            (card) =>
              !!(
                card
                  .querySelector("h3")
                  .compareDocumentPosition(card.querySelector("img")) &
                Node.DOCUMENT_POSITION_FOLLOWING
              ),
          ),
        ),
    ).toBe(true);
    await expect(page.locator(".corporate-style").nth(3)).toContainText("A4");
    await expect(page.locator(".corporate-style").nth(4)).toContainText(
      "35 × 25 cm",
    );
    await expect(page.locator(".corporate-style").nth(4)).toContainText("A4");
    const pdf = page.locator("main a[download]");
    const response = await page.request.get(await pdf.getAttribute("href"));
    expect(response.ok()).toBe(true);
    expect((await response.body()).subarray(0, 5).toString()).toBe("%PDF-");
    expect(
      new URL(
        await page.locator(".corporate-style a").first().getAttribute("href"),
      ).searchParams.get("text"),
    ).toContain("18 × 14 cm");
    await page.reload();
    await expect(page.locator("h1")).toHaveAccessibleName(heading);
    for (const path of [corporate, designs]) {
      await page.goto(path);
      await expect(page.locator("h1")).toHaveCount(1);
      if (path === designs) {
        await expect(page.locator(".custom-design-grid figure")).toHaveCount(7);
        for (let index = 0; index < 3; index++) {
          await expect(
            page.locator(".custom-design-grid img").nth(index),
          ).toHaveAttribute(
            "src",
            `/assets/disenos/estilo-${index + 1}-modas-laura.png`,
          );
        }
        await expect(
          page.locator('.desktop-nav a[aria-current="page"]'),
        ).toHaveAttribute("href", `/${designs.replace(/\/$/, "")}`);
      }
      for (const image of await page.locator("main img").all()) {
        await image.scrollIntoViewIfNeeded();
        await expect(image).toBeVisible();
        await expect
          .poll(() =>
            image.evaluate((el) => el.complete && el.naturalWidth > 0),
          )
          .toBe(true);
      }
      for (const width of [375, 768, 1024, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBe(true);
      }
      for (const theme of ["light", "dark"]) {
        await page.evaluate(
          (value) => (document.documentElement.dataset.theme = value),
          theme,
        );
        const audit = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze();
        expect(audit.violations.map((v) => v.id)).toEqual([]);
      }
      const routes = await page
        .locator('a[href^="/"], a[href^="#"]:not(.skip)')
        .evaluateAll((links) => links.map((a) => a.getAttribute("href")));
      expect(routes.filter((href) => href.includes("#"))).toEqual([]);
    }
    await page.goto(corporate);
    await page.getByRole("link", { name: link }).click();
    await expect(page).toHaveURL(new RegExp(`/${designs.replace(/\/$/, "")}$`));
    await page.goto(corporate);
    await page.locator(".language-switch").click();
    await expect(page).toHaveURL(
      new RegExp(
        home === "./" ? "/en/corporate-gifts$" : "/regalos-corporativos$",
      ),
    );
  });
}

test("Physical collection and contact routes have metadata and render without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  for (const path of [
    "coleccion/",
    "contacto/",
    "regalos-corporativos/",
    "disenos-personalizados/",
    "en/collection/",
    "en/contact/",
    "en/corporate-gifts/",
    "en/personalized-designs/",
  ]) {
    const response = await page.goto(
      `http://127.0.0.1:4173/${path.replace(/\/$/, "")}`,
    );
    expect(response.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://modas-laura.jcampos.dev/${path.replace(/\/$/, "")}`,
    );
  }
  await context.close();
});
