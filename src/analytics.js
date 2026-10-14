const ENDPOINT =
  "https://3hfswnyy1f.execute-api.us-east-1.amazonaws.com/analytics/event";
const SESSION_KEY = "modas-laura-analytics-session";
export const ROUTE_EVENT = "modas-laura:route-change";
const HOSTS = new Set([
  "modas-laura.jcampos.dev",
  "www.modas-laura.jcampos.dev",
]);
const DOWNLOADS = new Set([
  "catalogo-corporativo-modas-laura.pdf",
  "tarjeta-actual-85x55mm.pdf",
  "modas-laura.vcf",
]);
const UUID = /^[a-f\d]{8}(?:-[a-f\d]{4}){3}-[a-f\d]{12}$/i;

export function canCollect({ hostname, navigator = {} }) {
  return (
    HOSTS.has(hostname) &&
    !["1", "yes"].includes(String(navigator.doNotTrack).toLowerCase()) &&
    navigator.globalPrivacyControl !== true &&
    navigator.webdriver !== true &&
    !/bot|crawler|spider|headless|lighthouse|pagespeed/i.test(
      navigator.userAgent || "",
    )
  );
}

export function publicPath(value, paths) {
  // Only known public routes can enter telemetry, including on a 404 page.
  // This avoids recording names or other information in an arbitrary URL.
  try {
    const path = new URL(value, "https://modas-laura.jcampos.dev").pathname;
    const normalized = path.replace(/\/+$/, "") || "/";
    return paths.has(normalized) && normalized.length <= 180
      ? normalized
      : null;
  } catch {
    return null;
  }
}

export function referrerHost(value) {
  try {
    const url = new URL(value);
    const hostname = url.hostname.toLowerCase();
    const dns =
      /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z](?:[a-z0-9-]{0,61}[a-z0-9])?$/;
    return /^https?:$/.test(url.protocol) &&
      hostname.length <= 120 &&
      dns.test(hostname)
      ? hostname
      : "";
  } catch {
    return "";
  }
}

export function classifyLink(
  { href, origin, download = false, language },
  paths,
) {
  try {
    const url = new URL(href, origin);
    if (url.protocol === "tel:") return { kind: "phone", target: "phone" };
    if (url.protocol === "mailto:") return { kind: "email", target: "email" };
    if (!/^https?:$/.test(url.protocol)) return null;
    if (
      ["wa.me", "api.whatsapp.com", "web.whatsapp.com"].includes(url.hostname)
    )
      return { kind: "whatsapp", target: "whatsapp" };
    if (/^(?:www\.|m\.)?facebook\.com$/.test(url.hostname))
      return { kind: "social", target: "facebook" };
    if (/^(?:www\.)?instagram\.com$/.test(url.hostname))
      return { kind: "social", target: "instagram" };
    if (url.origin !== origin) return null;
    const filename = url.pathname.split("/").at(-1);
    if (download || /\.(?:pdf|vcf)$/i.test(url.pathname)) {
      return url.pathname.startsWith("/assets/") && DOWNLOADS.has(filename)
        ? { kind: "download", target: filename }
        : null;
    }
    if (
      url.pathname.startsWith("/assets/") &&
      /\.(?:webp|png|jpe?g|svg)$/i.test(url.pathname)
    )
      return { kind: "gallery", target: "image" };
    const path = publicPath(url.pathname, paths);
    if (!path) return null;
    if (["es", "en"].includes(language))
      return { kind: "language", target: language };
    return { kind: "navigation", target: path };
  } catch {
    return null;
  }
}

export function startAnalytics({
  window: win = window,
  document: doc = document,
  publicPaths = [],
} = {}) {
  const enabled = () =>
    canCollect(
      win.location
        ? { hostname: win.location.hostname, navigator: win.navigator }
        : {},
    );
  if (!enabled() || typeof win.crypto?.randomUUID !== "function")
    return () => {};
  const uuid = () => {
    try {
      return win.crypto.randomUUID();
    } catch {
      return null;
    }
  };
  const paths = new Set(
    publicPaths.map((path) => path.replace(/\/+$/, "") || "/"),
  );
  let session;
  try {
    session = win.sessionStorage.getItem(SESSION_KEY);
    if (!UUID.test(session || "")) {
      session = uuid();
      if (session) win.sessionStorage.setItem(SESSION_KEY, session);
    }
  } catch {
    // A blocked storage API never prevents using the public site.
    session = uuid();
  }
  if (!session) return () => {};
  let lastPath = null;
  let thresholds = new Set();
  let scheduled = null;
  const referrer = referrerHost(doc.referrer);

  function send(kind, target) {
    const path = publicPath(win.location.pathname, paths);
    if (!path || !enabled()) return;
    const id = uuid();
    if (!id) return;
    const width = win.innerWidth;
    const payload = {
      id,
      session,
      kind,
      path,
      target,
      locale: doc.body.dataset.locale === "en" ? "en" : "es",
      device: width < 768 ? "mobile" : width < 1024 ? "tablet" : "desktop",
      referrer,
    };
    try {
      void win
        .fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          credentials: "omit",
          referrerPolicy: "no-referrer",
          keepalive: true,
        })
        .catch(() => {});
    } catch {
      // Measurements are optional and must never interrupt an interaction.
    }
  }
  function pageView() {
    const path = publicPath(win.location.pathname, paths);
    if (!path || path === lastPath) return;
    lastPath = path;
    thresholds = new Set();
    send("page_view", path);
  }
  function click(event) {
    if (event.isTrusted === false || event.button > 0) return;
    const link = event.target.closest?.("a[href]");
    if (link) {
      const action = classifyLink(
        {
          href: link.href,
          origin: win.location.origin,
          download: link.hasAttribute("download"),
          language: link.getAttribute("hreflang"),
        },
        paths,
      );
      if (action) send(action.kind, action.target);
      return;
    }
    if (event.target.closest?.(".theme-switch")) {
      send(
        "theme",
        doc.documentElement.dataset.theme === "dark" ? "light" : "dark",
      );
    } else if (event.target.closest?.(".archive-gallery .filters button")) {
      send("gallery", "filter");
    }
  }
  function scrollDepth() {
    scheduled = null;
    if (win.scrollY <= 0 || doc.documentElement.scrollHeight <= win.innerHeight)
      return;
    const progress =
      (win.scrollY + win.innerHeight) / doc.documentElement.scrollHeight;
    for (const threshold of [50, 90]) {
      if (progress * 100 >= threshold && !thresholds.has(threshold)) {
        thresholds.add(threshold);
        send(`scroll_${threshold}`, String(threshold));
      }
    }
  }
  function scroll() {
    if (scheduled === null) scheduled = win.requestAnimationFrame(scrollDepth);
  }
  doc.addEventListener("click", click, true);
  win.addEventListener(ROUTE_EVENT, pageView);
  win.addEventListener("scroll", scroll, { passive: true });
  pageView();
  return () => {
    doc.removeEventListener("click", click, true);
    win.removeEventListener(ROUTE_EVENT, pageView);
    win.removeEventListener("scroll", scroll);
    if (scheduled !== null) win.cancelAnimationFrame(scheduled);
  };
}
