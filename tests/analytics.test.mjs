import test from "node:test";
import assert from "node:assert/strict";
import {
  canCollect,
  publicPath,
  referrerHost,
  classifyLink,
  startAnalytics,
  ROUTE_EVENT,
} from "../src/analytics.js";

const origin = "https://modas-laura.jcampos.dev";
const publicPaths = ["/", "/contacto", "/archivo", "/en/contact"];
const paths = new Set(publicPaths);

class Events {
  listeners = new Map();
  addEventListener(type, callback) {
    if (!this.listeners.has(type)) this.listeners.set(type, new Set());
    this.listeners.get(type).add(callback);
  }
  removeEventListener(type, callback) {
    this.listeners.get(type)?.delete(callback);
  }
  dispatchEvent(event) {
    for (const callback of this.listeners.get(event.type) || [])
      callback(event);
  }
}
function environment({
  hostname = "modas-laura.jcampos.dev",
  navigator = {},
} = {}) {
  const win = new Events();
  const doc = new Events();
  const requests = [];
  const storage = new Map();
  let count = 0;
  win.location = {
    hostname,
    origin,
    pathname: "/",
    search: "?secret=private",
    hash: "#name",
  };
  win.navigator = { userAgent: "Mozilla/5.0", ...navigator };
  win.innerWidth = 390;
  win.innerHeight = 800;
  win.scrollY = 0;
  win.crypto = {
    randomUUID: () =>
      `00000000-0000-4000-8000-${String(++count).padStart(12, "0")}`,
  };
  win.sessionStorage = {
    getItem: (key) => storage.get(key),
    setItem: (key, value) => storage.set(key, value),
  };
  win.localStorage = {
    setItem: () => assert.fail("Analytics must not use persistent storage"),
  };
  win.fetch = (url, options) => {
    requests.push({ url, options, payload: JSON.parse(options.body) });
    return Promise.resolve({ ok: true });
  };
  win.requestAnimationFrame = (callback) => {
    win.pendingFrame = callback;
    return 1;
  };
  win.cancelAnimationFrame = () => {
    win.pendingFrame = null;
  };
  doc.body = { dataset: { locale: "es" } };
  doc.documentElement = { dataset: { theme: "light" }, scrollHeight: 3000 };
  doc.referrer = "https://www.google.com/search?q=personal+information#private";
  return { win, doc, requests, storage };
}
const start = ({ win, doc }) =>
  startAnalytics({ window: win, document: doc, publicPaths });
function clickLink(doc, href, attributes = {}) {
  const link = {
    href,
    hasAttribute: (key) => Object.hasOwn(attributes, key),
    getAttribute: (key) => attributes[key] ?? null,
  };
  doc.dispatchEvent({
    type: "click",
    isTrusted: true,
    button: 0,
    target: { closest: (selector) => (selector === "a[href]" ? link : null) },
  });
}

test("Collection runs only on the public production host and respects privacy signals", () => {
  assert(canCollect({ hostname: "modas-laura.jcampos.dev" }));
  assert(canCollect({ hostname: "www.modas-laura.jcampos.dev" }));
  for (const hostname of [
    "localhost",
    "127.0.0.1",
    "admin.modas-laura.jcampos.dev",
    "example.com",
  ])
    assert(!canCollect({ hostname }));
  for (const hostname of ["localhost", "admin.modas-laura.jcampos.dev"]) {
    const env = environment({ hostname });
    start(env);
    assert.equal(env.requests.length, 0);
    assert.equal(env.storage.size, 0);
  }
  for (const navigator of [
    { doNotTrack: "1" },
    { doNotTrack: "yes" },
    { globalPrivacyControl: true },
    { webdriver: true },
    { userAgent: "Googlebot" },
    { userAgent: "HeadlessChrome" },
  ]) {
    const env = environment({ navigator });
    start(env);
    assert.equal(env.requests.length, 0);
    assert.equal(env.storage.size, 0);
  }
});

test("Interaction classification never sends contact details or arbitrary URLs", () => {
  for (const [href, action] of [
    [
      "https://wa.me/50689890512?text=private+message",
      { kind: "whatsapp", target: "whatsapp" },
    ],
    ["tel:+50689890512", { kind: "phone", target: "phone" }],
    [
      "mailto:person@example.com?body=secret",
      { kind: "email", target: "email" },
    ],
    [
      "https://www.facebook.com/personal-profile?private=value",
      { kind: "social", target: "facebook" },
    ],
    [
      `${origin}/contacto?email=person@example.com#secret`,
      { kind: "navigation", target: "/contacto" },
    ],
    [
      `${origin}/assets/diseno-con-nombre.webp?token=private`,
      { kind: "gallery", target: "image" },
    ],
  ])
    assert.deepEqual(classifyLink({ href, origin }, paths), action);
  assert.equal(
    classifyLink({ href: "https://example.com/private", origin }, paths),
    null,
  );
  assert.equal(
    classifyLink({ href: `${origin}/person@example.com`, origin }, paths),
    null,
  );
  assert.equal(
    classifyLink(
      { href: `${origin}/assets/private-name.pdf`, origin, download: true },
      paths,
    ),
    null,
  );
  assert.deepEqual(
    classifyLink(
      {
        href: `${origin}/assets/modas-laura.vcf?secret=value`,
        origin,
        download: true,
      },
      paths,
    ),
    { kind: "download", target: "modas-laura.vcf" },
  );
  assert.deepEqual(
    classifyLink(
      { href: `${origin}/en/contact#secret`, origin, language: "en" },
      paths,
    ),
    { kind: "language", target: "en" },
  );
  assert.equal(
    publicPath("/contacto/?name=secret#private", paths),
    "/contacto",
  );
  assert.equal(publicPath("/unknown/private-name", paths), null);
  assert.equal(
    referrerHost("https://user:secret@search.example/query?q=private#name"),
    "search.example",
  );
  assert.equal(referrerHost("mailto:person@example.com"), "");
  for (const value of [
    "http://127.0.0.1/private",
    "http://192.168.1.1/private",
    "http://[::1]/private",
    "http://localhost/private",
    `https://${"a".repeat(60)}.${"b".repeat(60)}.com/private`,
  ])
    assert.equal(
      referrerHost(value),
      "",
      "Referrers must be public DNS hostnames of at most 120 characters",
    );
});

test("Route commits count once, including Back; session stays tab-scoped and payload minimal", () => {
  const env = environment();
  const dispose = start(env);
  env.win.dispatchEvent({ type: ROUTE_EVENT });
  assert.equal(
    env.requests.length,
    1,
    "Hydration or repeated route events do not duplicate a view",
  );
  env.win.location.pathname = "/contacto";
  env.win.dispatchEvent({ type: ROUTE_EVENT });
  env.win.dispatchEvent({ type: ROUTE_EVENT });
  env.win.location.pathname = "/";
  env.win.dispatchEvent({ type: ROUTE_EVENT });
  assert.deepEqual(
    env.requests.map((request) => request.payload.path),
    ["/", "/contacto", "/"],
  );
  const session = env.requests[0].payload.session;
  for (const { url, options, payload } of env.requests) {
    assert.equal(
      url,
      "https://3hfswnyy1f.execute-api.us-east-1.amazonaws.com/analytics/event",
    );
    assert.deepEqual(
      Object.keys(payload).sort(),
      [
        "id",
        "session",
        "kind",
        "path",
        "target",
        "locale",
        "device",
        "referrer",
      ].sort(),
    );
    assert.equal(payload.session, session);
    assert.equal(payload.referrer, "www.google.com");
    assert.equal(payload.device, "mobile");
    assert.equal(options.credentials, "omit");
    assert.equal(options.referrerPolicy, "no-referrer");
    assert.equal(options.keepalive, true);
    assert(!options.body.includes("secret"));
  }
  assert.equal(
    new Set(env.requests.map((request) => request.payload.id)).size,
    3,
  );
  dispose();
  const before = env.requests.length;
  env.win.location.pathname = "/archivo";
  env.win.dispatchEvent({ type: ROUTE_EVENT });
  assert.equal(env.requests.length, before);
  start(env);
  assert.equal(
    env.requests.at(-1).payload.session,
    session,
    "A page reload in the same tab reuses its session",
  );
  const other = environment();
  // Different tabs have separate storage; their random generator is browser-provided.
  other.win.crypto.randomUUID = () => "ffffffff-ffff-4fff-8fff-ffffffffffff";
  start(other);
  assert.notEqual(other.requests[0].payload.session, session);
});

test("Preferences, contacts and scroll thresholds work without collecting user content", () => {
  const env = environment();
  start(env);
  clickLink(env.doc, "https://wa.me/50689890512?text=secret");
  env.doc.dispatchEvent({
    type: "click",
    isTrusted: true,
    button: 0,
    target: {
      closest: (selector) => (selector === ".theme-switch" ? {} : null),
    },
  });
  clickLink(env.doc, `${origin}/en/contact`, { hreflang: "en" });
  env.win.scrollY = 800;
  env.win.dispatchEvent({ type: "scroll" });
  env.win.pendingFrame();
  env.win.scrollY = 2200;
  env.win.dispatchEvent({ type: "scroll" });
  env.win.pendingFrame();
  env.win.dispatchEvent({ type: "scroll" });
  env.win.pendingFrame();
  assert.deepEqual(
    env.requests.map((request) => request.payload.kind),
    ["page_view", "whatsapp", "theme", "language", "scroll_50", "scroll_90"],
  );
  assert.equal(env.requests[2].payload.target, "dark");
  assert(!JSON.stringify(env.requests).includes("89890512"));
  env.win.location.pathname = "/archivo";
  env.win.dispatchEvent({ type: ROUTE_EVENT });
  env.win.dispatchEvent({ type: "scroll" });
  env.win.pendingFrame();
  assert.equal(
    env.requests.filter((request) => request.payload.kind === "scroll_90")
      .length,
    2,
  );
});

test("Blocked storage and delivery failures never interrupt the public site", async () => {
  const env = environment();
  env.win.sessionStorage = {
    getItem() {
      throw Error("Blocked");
    },
  };
  env.win.fetch = () => Promise.reject(Error("Offline"));
  assert.doesNotThrow(() => start(env));
  assert.doesNotThrow(() => clickLink(env.doc, "tel:+50689890512"));
  await Promise.resolve();
  env.win.fetch = () => {
    throw Error("Unavailable");
  };
  assert.doesNotThrow(() => clickLink(env.doc, "mailto:person@example.com"));
  env.win.crypto.randomUUID = () => {
    throw Error("Unavailable randomness");
  };
  assert.doesNotThrow(() => clickLink(env.doc, "mailto:person@example.com"));
});
