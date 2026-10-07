import { test, expect } from "@playwright/test";

test("Page navigation keeps the shell and animates only content", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("coleccion");
  await page.evaluate(() => {
    window.shell = {
      header: document.querySelector("header"),
      footer: document.querySelector("footer"),
      document,
    };
    window.motionTargets = [];
    const animate = Element.prototype.animate;
    Element.prototype.animate = function (...args) {
      window.motionTargets.push(this.className);
      return animate.apply(this, args);
    };
  });
  await page.locator('.desktop-nav a[href="/regalos-corporativos"]').click();
  await expect(page).toHaveURL(/\/regalos-corporativos$/);
  await expect(page.locator(".page-content")).not.toHaveAttribute(
    "aria-busy",
    "true",
  );
  await expect(page.locator("h1")).toBeFocused();
  await expect(page).toHaveTitle(/Regalos corporativos/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://modas-laura.jcampos.dev/regalos-corporativos",
  );
  expect(
    await page.evaluate(() => ({
      sameDocument: window.shell.document === document,
      sameHeader: window.shell.header === document.querySelector("header"),
      sameFooter: window.shell.footer === document.querySelector("footer"),
      targets: window.motionTargets,
      footerReveals: document.querySelectorAll("footer [data-reveal]").length,
    })),
  ).toEqual({
    sameDocument: true,
    sameHeader: true,
    sameFooter: true,
    targets: ["page-content", "page-content"],
    footerReveals: 0,
  });
});

test("Reduced motion, language, back and forward preserve navigation state", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 700 });
  await page.goto("archivo");
  await page.locator(".theme-switch").click();
  await page.evaluate(() => {
    window.shellHeader = document.querySelector("header");
    window.scrollTo({ top: 600, behavior: "instant" });
  });
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(600);
  // Click the visible sticky link without Playwright scrolling its ancestors.
  const historyLink = await page
    .locator('.desktop-nav a[href="/historia"]')
    .boundingBox();
  await page.mouse.click(
    historyLink.x + historyLink.width / 2,
    historyLink.y + historyLink.height / 2,
  );
  await expect(page).toHaveURL(/\/historia$/);
  await expect(page.locator(".page-content")).not.toHaveAttribute(
    "aria-busy",
    "true",
  );
  expect(
    await page
      .locator(".page-content")
      .evaluate((el) => el.getAnimations().length),
  ).toBe(0);
  await page.goBack();
  await expect(page.locator("body")).toHaveAttribute("data-page", "archive");
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(600);
  await page.goForward();
  await expect(page.locator("body")).toHaveAttribute("data-page", "history");
  await page.locator(".language-switch").click();
  await expect(page).toHaveURL(/\/en\/history$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  expect(
    await page.evaluate(
      () => window.shellHeader === document.querySelector("header"),
    ),
  ).toBe(true);
  await page.reload();
  await expect(page.locator("body")).toHaveAttribute("data-page", "history");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("Rapid navigation keeps the latest destination and fetch failures fall back to native links", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("coleccion");
  await page.route("**/historia", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    await route.continue().catch(() => {});
  });
  await page.locator('.desktop-nav a[href="/historia"]').click();
  await expect(page.locator(".page-content")).toHaveAttribute(
    "aria-busy",
    "true",
  );
  await page.locator('.desktop-nav a[href="/regalos-corporativos"]').click();
  await expect(page).toHaveURL(/\/regalos-corporativos$/);
  await expect(page.locator("body")).toHaveAttribute("data-page", "corporate");
  await expect(page.locator(".page-content")).not.toHaveAttribute(
    "aria-busy",
    "true",
  );
  await page.unroute("**/historia");
  let failed = false;
  await page.route("**/historia", async (route) => {
    if (!failed && route.request().resourceType() === "fetch") {
      failed = true;
      await route.abort();
    } else await route.continue();
  });
  await page.locator('.desktop-nav a[href="/historia"]').click();
  await expect(page).toHaveURL(/\/historia$/);
  await expect(page.locator("body")).toHaveAttribute("data-page", "history");
  await expect(page.locator("h1")).toBeVisible();
  expect(failed).toBe(true);
});
