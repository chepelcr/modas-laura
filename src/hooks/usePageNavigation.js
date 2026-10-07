import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { pagePaths } from "../i18n/LocaleContext.jsx";
import { durationInMilliseconds } from "../design-system/motion.js";

const normalize = (path) => path.replace(/\/$/, "") || "/";
const routes = new Map(
  Object.entries(pagePaths).flatMap(([locale, pages]) =>
    Object.entries(pages).map(([page, path]) => [
      normalize(`/${path}`),
      { page, locale },
    ]),
  ),
);
const metadata =
  'meta[name="description"], meta[name="robots"], meta[property^="og:"], meta[name^="twitter:"], link[rel="canonical"], link[rel="alternate"], script[type="application/ld+json"]';

export function usePageNavigation(initialPage, initialLocale) {
  const [route, setRoute] = useState({
    page: initialPage,
    locale: initialLocale,
    key: 0,
  });
  const content = useRef(null);

  useEffect(() => {
    let controller;
    let sequence = 0;
    let currentEntry = history.state?.modasLauraEntry || crypto.randomUUID();
    const positions = new Map();
    const animations = new Set();
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const previousRestoration = history.scrollRestoration;
    history.scrollRestoration = "manual";
    history.replaceState(
      { ...history.state, modasLauraEntry: currentEntry },
      "",
    );

    function rememberScroll() {
      positions.set(currentEntry, { left: scrollX, top: scrollY });
    }
    function cancelAnimations() {
      animations.forEach((animation) => animation.cancel());
      animations.clear();
    }
    async function animate(
      frames,
      token,
      fallback,
      targets = [content.current],
    ) {
      if (reduced.matches || !content.current.animate) return;
      const styles = getComputedStyle(content.current);
      await Promise.all(
        targets.map(async (target) => {
          const animation = target.animate(frames, {
            duration: durationInMilliseconds(
              styles.getPropertyValue(token),
              fallback,
            ),
            easing: styles.getPropertyValue("--ease-page") || "ease-in-out",
            fill: "both",
          });
          animations.add(animation);
          await animation.finished.catch(() => {});
          animations.delete(animation);
          animation.cancel();
        }),
      );
    }
    async function navigate(url, destination, pop = false, entry) {
      const request = ++sequence;
      controller?.abort();
      cancelAnimations();
      controller = new AbortController();
      const signal = controller.signal;
      const region = content.current;
      const languageChange =
        destination.locale !== document.body.dataset.locale &&
        destination.page === document.body.dataset.page;
      const readingPosition = { top: scrollY, left: scrollX };
      const transitionTargets = languageChange
        ? [region, ...document.querySelectorAll("[data-locale-copy]")]
        : [region];
      region.dataset.navigation = languageChange ? "language" : "page";
      region.setAttribute("aria-busy", "true");
      try {
        // Read the same prerendered document used by direct links and crawlers.
        const response = await fetch(url.href, { signal });
        if (!response.ok) throw new Error("Page unavailable");
        const documentPage = new DOMParser().parseFromString(
          await response.text(),
          "text/html",
        );
        if (
          documentPage.body.dataset.page !== destination.page ||
          documentPage.body.dataset.locale !== destination.locale
        )
          throw new Error("Unexpected page");
        if (request !== sequence) return;

        region.dataset.transition = "leaving";
        await animate(
          languageChange
            ? [{ opacity: 1 }, { opacity: 0 }]
            : [
                { opacity: 1, transform: "translateY(0)" },
                { opacity: 0, transform: "translateY(-20px)" },
              ],
          languageChange ? "--duration-language-exit" : "--duration-page-exit",
          320,
          transitionTargets,
        );
        if (request !== sequence) return;

        if (!pop) {
          rememberScroll();
          currentEntry = crypto.randomUUID();
          history.pushState({ modasLauraEntry: currentEntry }, "", url.href);
        } else {
          currentEntry = entry || crypto.randomUUID();
          history.replaceState(
            { ...history.state, modasLauraEntry: currentEntry },
            "",
          );
        }
        document.title = documentPage.title;
        document.documentElement.lang = documentPage.documentElement.lang;
        document.querySelectorAll(metadata).forEach((node) => node.remove());
        documentPage.querySelectorAll(metadata).forEach((node) => {
          document.head.appendChild(document.importNode(node, true));
        });
        document.body.dataset.page = destination.page;
        document.body.dataset.locale = destination.locale;
        flushSync(() => setRoute({ ...destination, key: request }));

        const position = pop
          ? positions.get(currentEntry)
          : languageChange
            ? readingPosition
            : null;
        const hashTarget = url.hash
          ? document.getElementById(decodeURIComponent(url.hash.slice(1)))
          : null;
        if (position) window.scrollTo({ ...position, behavior: "instant" });
        else if (hashTarget) hashTarget.scrollIntoView({ behavior: "instant" });
        else window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        if (!pop) {
          const heading = region.querySelector("h1");
          heading?.setAttribute("tabindex", "-1");
          heading?.focus({ preventScroll: true });
        }

        region.dataset.transition = "entering";
        await animate(
          languageChange
            ? [{ opacity: 0 }, { opacity: 1 }]
            : [
                { opacity: 0, transform: "translateY(24px)" },
                { opacity: 1, transform: "translateY(0)" },
              ],
          languageChange
            ? "--duration-language-enter"
            : "--duration-page-enter",
          560,
          transitionTargets,
        );
      } catch {
        // Preserve native navigation if a document cannot be fetched or parsed.
        if (!signal.aborted && request === sequence)
          window.location.assign(url.href);
      } finally {
        if (request === sequence) {
          region.removeAttribute("aria-busy");
          delete region.dataset.transition;
          delete region.dataset.navigation;
        }
      }
    }
    function click(event) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const link = event.target.closest?.("a[href]");
      if (
        !link ||
        link.hasAttribute("download") ||
        (link.target && link.target !== "_self")
      )
        return;
      const url = new URL(link.href);
      if (
        url.origin !== location.origin ||
        (normalize(url.pathname) === normalize(location.pathname) &&
          url.search === location.search)
      )
        return;
      const destination = routes.get(normalize(url.pathname));
      if (!destination) return;
      event.preventDefault();
      void navigate(url, destination);
    }
    function pop(event) {
      const url = new URL(location.href);
      const destination = routes.get(normalize(url.pathname));
      if (destination)
        void navigate(url, destination, true, event.state?.modasLauraEntry);
      else location.reload();
    }
    document.addEventListener("click", click);
    addEventListener("popstate", pop);
    addEventListener("scroll", rememberScroll, { passive: true });
    reduced.addEventListener("change", cancelAnimations);
    return () => {
      sequence++;
      controller?.abort();
      cancelAnimations();
      history.scrollRestoration = previousRestoration;
      document.removeEventListener("click", click);
      removeEventListener("popstate", pop);
      removeEventListener("scroll", rememberScroll);
      reduced.removeEventListener("change", cancelAnimations);
    };
  }, []);

  return { route, content };
}
