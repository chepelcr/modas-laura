import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("React hydrates without errors; all direct routes and metadata work", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  for (const [path, title] of [
    ["", "Modas Laura"],
    ["historia/", "Nuestra historia"],
    ["archivo/", "El archivo"],
    ["privacidad/", "Privacidad"],
  ]) {
    const response = await page.goto(path || "./");
    expect(response.status()).toBe(200);
    await expect(page).toHaveTitle(new RegExp(title));
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://modas-laura.jcampos.dev/${path}`,
    );
    await page.reload();
    await expect(page.locator("main")).toBeVisible();
  }
  expect(errors).toEqual([]);
});
test("Guided consultation respects endpoints and preserves keyboard focus", async ({
  page,
}) => {
  await page.goto("./");
  const prev = page.getByRole("button", { name: "Paso anterior" }),
    next = page.getByRole("button", { name: "Paso siguiente" });
  await expect(prev).toBeDisabled();
  await next.click();
  await expect(
    page.getByRole("heading", { name: "Contanos qué buscás" }),
  ).toBeVisible();
  await next.click();
  await expect(next).toBeDisabled();
  await expect(prev).toBeFocused();
  await expect(page.locator(".process-progress")).toHaveAttribute(
    "aria-label",
    "Paso 3 de 3",
  );
  await prev.click();
  await prev.click();
  await expect(prev).toBeDisabled();
  await expect(next).toBeFocused();
  await expect(
    page.getByRole("heading", { name: "Encontrá tu línea" }),
  ).toBeVisible();
});
test("Archive filters and restored images work and direct anchors expose historic products", async ({
  page,
}) => {
  await page.goto("archivo/");
  await expect(page.locator(".archive-card")).toHaveCount(10);
  await page.getByRole("button", { name: "Infantil", exact: true }).click();
  await expect(page.locator(".archive-card")).toHaveCount(1);
  await expect(
    page.getByRole("heading", { name: "Almohada infantil", exact: true }),
  ).toBeVisible();
  await expect(page.locator(".archive-card details")).toHaveCount(0);
  await expect(page.locator(".archive-card img")).toHaveAttribute(
    "src",
    "/assets/archivo-almohada-infantil.webp",
  );
  await expect(page.locator(".archive-card > a")).toHaveAttribute(
    "href",
    "/assets/archivo-almohada-infantil.webp",
  );
  await page.goto("archivo/#cogeollas");
  await expect(page.locator("#cogeollas")).toBeVisible();
  await expect(page.locator(".archive-card")).toHaveCount(10);
});
test("Mobile menu is modal, closes with Escape and restores focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("./");
  const toggle = page.getByRole("button", { name: "Abrir menú" });
  await toggle.click();
  await expect(page.locator("dialog")).toBeVisible();
  await expect(page.locator(".menu-head .brand-light")).toBeVisible();
  await expect(page.locator(".menu-head .brand")).toHaveText("");
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(page.locator("dialog")).not.toBeVisible();
  await expect(toggle).toBeFocused();
  await toggle.click();
  await page
    .getByRole("navigation", { name: "Principal móvil" })
    .getByRole("link", { name: "Colección", exact: true })
    .click();
  await expect(page.locator("dialog")).not.toBeVisible();
  await expect(page.locator("#coleccion")).toBeInViewport();
});
for (const width of [375, 768, 1440]) {
  test(`Responsive layout, images and accessibility at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ["./", "historia/", "archivo/"]) {
      await page.goto(path);
      await page.locator("footer").scrollIntoViewIfNeeded();
      const measure = await page.evaluate(() => ({
        viewport: innerWidth,
        document: document.documentElement.scrollWidth,
        broken: [...document.images]
          .filter((img) => img.complete && img.naturalWidth === 0)
          .map((img) => img.src),
      }));
      expect(measure.document).toBeLessThanOrEqual(measure.viewport);
      expect(measure.broken).toEqual([]);
      const audit = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(
        audit.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => n.target),
        })),
      ).toEqual([]);
    }
  });
}
test("Reduced motion stops loops; short landscape consultation fits", async ({
  page,
}) => {
  await page.setViewportSize({ width: 844, height: 390 });
  await page.goto("./");
  await page.locator(".process-card").scrollIntoViewIfNeeded();
  for (let index = 0; index < 3; index++) {
    const bounds = await page.locator(".process-card").boundingBox();
    expect(bounds.height).toBeLessThan(390 - 80);
    if (index < 2)
      await page.getByRole("button", { name: "Paso siguiente" }).click();
  }
  const animations = await page
    .locator(".ring-one")
    .evaluate((el) => el.getAnimations().length);
  expect(animations).toBe(0);
});

test("Prerendered pages retain their content and native contacts without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  for (const path of ["./", "historia/", "archivo/"]) {
    await page.goto(`http://127.0.0.1:4173/${path}`);
    await expect(page.locator("h1")).toBeVisible();
  }
  await page.goto("http://127.0.0.1:4173/");
  await expect(page.getByRole("link", { name: "8989-0512" })).toHaveAttribute(
    "href",
    "tel:+50689890512",
  );
  await context.close();
});
test("Navigation follows the reading line in both scroll directions", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("./");
  await page.locator("#coleccion").evaluate((el) => el.scrollIntoView());
  await expect(
    page
      .getByRole("navigation", { name: "Principal", exact: true })
      .getByRole("link", { name: "Colección", exact: true }),
  ).toHaveAttribute("aria-current", "location");
  await page.locator("#contacto").evaluate((el) => el.scrollIntoView());
  await expect(
    page
      .getByRole("navigation", { name: "Principal", exact: true })
      .getByRole("link", { name: "Contacto", exact: true }),
  ).toHaveAttribute("aria-current", "location");
  await page.locator("#coleccion").evaluate((el) => el.scrollIntoView());
  await expect(
    page
      .getByRole("navigation", { name: "Principal", exact: true })
      .getByRole("link", { name: "Colección", exact: true }),
  ).toHaveAttribute("aria-current", "location");
});

test("Product actions align across desktop cards", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("./");
  const bottoms = await page
    .locator(".product-copy .text-link")
    .evaluateAll((links) =>
      links.map((link) => link.getBoundingClientRect().bottom),
    );
  expect(Math.max(...bottoms) - Math.min(...bottoms)).toBeLessThan(1);
});

test("Decorative motion runs only in view and focused content stays opaque", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("./");
  await page.locator(".process-card").scrollIntoViewIfNeeded();
  await expect(page.locator(".process-card")).toHaveClass(/in-view/);
  await expect
    .poll(() =>
      page.locator(".ring-one").evaluate((el) => el.getAnimations().length),
    )
    .toBe(1);
  await page.locator(".process-content a").focus();
  await expect(page.locator(".process-card")).toHaveCSS("opacity", "1");
  await page.locator("#contacto").evaluate((el) => el.scrollIntoView());
  await expect(page.locator(".process-card")).not.toHaveClass(/in-view/);
  await expect
    .poll(() =>
      page.locator(".ring-one").evaluate((el) => el.getAnimations().length),
    )
    .toBe(0);
});

test("Language keeps the current page and theme persists across navigation", async ({
  page,
}) => {
  await page.goto("historia/");
  await expect(page.locator(".language-switch .country-flag path")).toHaveCount(
    3,
  );
  await expect(page.locator(".language-switch")).toHaveText("");
  await page.getByRole("button", { name: "Activar tema oscuro" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("link", { name: "Cambiar a inglés" }).click();
  await expect(page).toHaveURL(/\/en\/history\/$/);
  await expect(page.locator(".language-switch .country-flag path")).toHaveCount(
    51,
  );
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

for (const width of [375, 1440]) {
  test(`English routes and dark theme accessibility at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    for (const path of ["en/", "en/history/", "en/archive/", "en/privacy/"]) {
      await page.goto(path);
      await expect(page.locator("html")).toHaveAttribute("lang", "en");
      await expect(page.locator("h1")).toHaveCount(1);
      if ((await page.locator("html").getAttribute("data-theme")) !== "dark")
        await page.locator(".theme-switch").click();
      await page.locator("footer").scrollIntoViewIfNeeded();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      const audit = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(
        audit.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => n.target),
        })),
      ).toEqual([]);
    }
    expect(errors).toEqual([]);
  });
}

test("Portrait label extends equally beyond the photo's left and bottom edges", async ({
  page,
}) => {
  for (const width of [375, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ["./", "en/"]) {
      await page.goto(path);
      await page.locator(".portrait-tag").scrollIntoViewIfNeeded();
      await expect
        .poll(async () =>
          page.locator(".portrait-image").evaluate((el) => {
            const image = el.querySelector("img").getBoundingClientRect();
            const label = el
              .querySelector(".portrait-tag")
              .getBoundingClientRect();
            return Math.abs(
              image.left - label.left - (label.bottom - image.bottom),
            );
          }),
        )
        .toBeLessThan(1);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      );
      expect(overflow).toBe(false);
    }
  }
});

test("Archive collection action opens the home collection in the selected language", async ({
  page,
}) => {
  for (const [archive, home] of [
    ["archivo/", "/"],
    ["en/archive/", "/en/"],
    ["historia/", "/"],
    ["en/history/", "/en/"],
  ]) {
    await page.goto(archive);
    const action = page.locator('.closing a.button[href$="#coleccion"]');
    await expect(action).toHaveAttribute("href", `${home}#coleccion`);
    await action.click();
    await expect(page).toHaveURL(`http://127.0.0.1:4173${home}#coleccion`);
    await expect(page.locator("#coleccion")).toBeInViewport();
  }
});

test("Content vanishes outside the reading area and returns on every page", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 1440, height: 600 });
  for (const path of [
    "./",
    "historia/",
    "archivo/",
    "privacidad/",
    "en/",
    "en/history/",
    "en/archive/",
    "en/privacy/",
  ]) {
    await page.goto(path);
    const first = page.locator("main [data-reveal]").first();
    await first.scrollIntoViewIfNeeded();
    await expect(first).toHaveCSS("opacity", "1");
    await page.locator("main").click({ position: { x: 1, y: 1 }, force: true });
    await page.evaluate(() => {
      document.activeElement.blur();
      window.scrollTo(0, document.documentElement.scrollHeight);
    });
    await expect(first).toHaveCSS("opacity", "0");
    await first.scrollIntoViewIfNeeded();
    await expect(first).toHaveCSS("opacity", "1");
    await expect(page.locator(".brand-band")).toHaveCount(
      path === "./" || path === "en/" ? 1 : 0,
    );
  }
});

test("Contact keeps the country code beside the number and serves the updated card", async ({
  page,
}) => {
  for (const path of ["./", "en/"]) {
    for (const width of [320, 375, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path);
      const phone = page.locator(".contact-info .phone");
      await expect(phone).toHaveAttribute("href", "tel:+50689890512");
      await expect(phone).toHaveText("+5068989-0512");
      const aligned = await phone.evaluate((el) => {
        const [code, number] = [...el.children].map((s) =>
          s.getBoundingClientRect(),
        );
        return (
          code.right <= number.left &&
          code.bottom > number.top &&
          code.top < number.bottom
        );
      });
      expect(aligned).toBe(true);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
  }
  const card = page.locator("footer a[download]");
  await expect(card).toHaveAttribute(
    "href",
    "/assets/tarjeta-actual-85x55mm.pdf",
  );
  const response = await page.request.get(await card.getAttribute("href"));
  expect(response.ok()).toBe(true);
  expect((await response.body()).subarray(0, 5).toString()).toBe("%PDF-");
  const contact = await page.request.get("/assets/modas-laura.vcf");
  expect(await contact.text()).toContain("TEL;TYPE=CELL:+50689890512\r\n");
  expect(await contact.text()).not.toContain("\\r\\n");
});
