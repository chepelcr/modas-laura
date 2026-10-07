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
    window.motionSamples = [];
    window.recordMotion = true;
    function sample() {
      const content = document.querySelector(".page-content");
      window.motionSamples.push({
        stage: content.dataset.transition,
        opacity: Number(getComputedStyle(content).opacity),
      });
      if (window.recordMotion) requestAnimationFrame(sample);
    }
    requestAnimationFrame(sample);
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
  const samples = await page.evaluate(() => {
    window.recordMotion = false;
    return window.motionSamples;
  });
  for (const stage of ["leaving", "entering"]) {
    expect(
      samples.filter(
        (sample) =>
          sample.stage === stage &&
          sample.opacity > 0.15 &&
          sample.opacity < 0.85,
      ).length,
    ).toBeGreaterThan(3);
  }
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

test("Language crossfades the content and labels while keeping the reading position", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 1440, height: 700 });
  await page.goto("historia");
  await page.evaluate(() => {
    window.shell = {
      header: document.querySelector("header"),
      footer: document.querySelector("footer"),
    };
    window.languageAnimations = [];
    const animate = Element.prototype.animate;
    Element.prototype.animate = function (frames, options) {
      window.languageAnimations.push({
        content: this.classList.contains("page-content"),
        label: this.hasAttribute("data-locale-copy"),
        duration: options.duration,
        frames,
      });
      return animate.call(this, frames, options);
    };
    window.scrollTo({ top: 350, behavior: "instant" });
  });
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(350);
  const toggle = await page.locator(".language-switch").boundingBox();
  await page.mouse.click(
    toggle.x + toggle.width / 2,
    toggle.y + toggle.height / 2,
  );
  await expect(page.locator(".page-content")).toHaveAttribute(
    "data-navigation",
    "language",
  );
  await expect(page).toHaveURL(/\/en\/history$/);
  await expect(page.locator(".page-content")).not.toHaveAttribute(
    "aria-busy",
    "true",
  );
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(350);
  const result = await page.evaluate(() => ({
    sameHeader: window.shell.header === document.querySelector("header"),
    sameFooter: window.shell.footer === document.querySelector("footer"),
    animations: window.languageAnimations,
  }));
  expect(result.sameHeader && result.sameFooter).toBe(true);
  expect(
    result.animations.filter((a) => a.content).map((a) => a.duration),
  ).toEqual([300, 520]);
  expect(result.animations.some((a) => a.label)).toBe(true);
  expect(
    result.animations.every(
      (a) =>
        (a.content || a.label) &&
        a.frames.every((frame) => !("transform" in frame)),
    ),
  ).toBe(true);
});

test("Theme colors and the logo transition gradually", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("coleccion");
  await page.locator(".theme-switch").click();
  await expect(page.locator("html")).toHaveAttribute(
    "data-theme-transition",
    "true",
  );
  await page.waitForFunction(() =>
    document.body
      .getAnimations()
      .some(
        (animation) =>
          animation.effect.getTiming().duration === 650 &&
          animation.currentTime > 100 &&
          animation.currentTime < 500,
      ),
  );
  const sample = await page.evaluate(() => ({
    color: getComputedStyle(document.body).backgroundColor,
    logoOpacity: Number(
      getComputedStyle(document.querySelector(".brand-dark")).opacity,
    ),
  }));
  expect(sample.color).not.toBe("rgb(16, 31, 27)");
  expect(sample.logoOpacity).toBeGreaterThan(0);
  expect(sample.logoOpacity).toBeLessThan(1);
  await expect(page.locator("html")).not.toHaveAttribute(
    "data-theme-transition",
    "true",
  );
  await expect(page.locator("body")).toHaveCSS(
    "background-color",
    "rgb(16, 31, 27)",
  );
});
