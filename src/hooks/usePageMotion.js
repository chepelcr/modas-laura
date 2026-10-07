import { useEffect } from "react";

export function usePageMotion(routeKey) {
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const elements = new Set();
    const added = new Set();
    let frame;
    function update() {
      frame = undefined;
      const header = document
        .querySelector(".header")
        .getBoundingClientRect().bottom;
      document.body.classList.toggle("motion-ready", !reduced.matches);
      elements.forEach((el) => {
        if (!el.isConnected) {
          elements.delete(el);
          return;
        }
        const bounds = el.getBoundingClientRect();
        const inView = bounds.bottom > header && bounds.top < innerHeight;
        const ratio = Math.max(
          0,
          Math.min(
            1,
            (innerHeight - bounds.top) / 80,
            (bounds.bottom - header) / 80,
          ),
        );
        el.classList.toggle("in-view", inView);
        el.style.setProperty(
          "--reveal-opacity",
          String(reduced.matches ? 1 : ratio),
        );
        el.style.setProperty(
          "--reveal-y",
          `${reduced.matches ? 0 : (1 - ratio) * 12}px`,
        );
      });
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    function discover() {
      const targets = document.querySelectorAll(
        "main [data-reveal], main .page-intro, main .closing, main .history-opening > *, main h1, main h2, main h3, main p, main figure, main article, main .eyebrow, main .brand-band, main .filters, main .hero-actions, main .back-link",
      );
      targets.forEach((el) => {
        // Animate a content block once, rather than multiplying nested opacity.
        if (el.parentElement.closest("[data-reveal]")) return;
        if (!el.hasAttribute("data-reveal")) {
          el.setAttribute("data-reveal", "");
          el.classList.add("reveal");
          added.add(el);
        }
        elements.add(el);
      });
      schedule();
    }
    const mutations = new MutationObserver(discover);
    mutations.observe(document.querySelector("main"), {
      childList: true,
      subtree: true,
    });
    discover();
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    reduced.addEventListener("change", schedule);
    return () => {
      mutations.disconnect();
      cancelAnimationFrame(frame);
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
      reduced.removeEventListener("change", schedule);
      elements.forEach((el) => {
        el.classList.remove("in-view");
        el.style.removeProperty("--reveal-opacity");
        el.style.removeProperty("--reveal-y");
      });
      added.forEach((el) => {
        el.removeAttribute("data-reveal");
        el.classList.remove("reveal");
      });
      document.body.classList.remove("motion-ready");
    };
  }, [routeKey]);
}
