import { useEffect } from "react";
export function usePageMotion() {
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const elements = [...document.querySelectorAll("[data-reveal]")];
    const visible = new Set();
    let frame;
    function update() {
      frame = undefined;
      const header = document
        .querySelector(".header")
        .getBoundingClientRect().bottom;
      document.body.classList.toggle("motion-ready", !reduced.matches);
      if (reduced.matches) return;
      visible.forEach((el) => {
        const r = el.getBoundingClientRect();
        const ratio = Math.max(
          0,
          Math.min(1, (innerHeight - r.top) / 100, (r.bottom - header) / 100),
        );
        el.style.setProperty("--reveal-opacity", String(0.72 + 0.28 * ratio));
        el.style.setProperty("--reveal-y", `${(1 - ratio) * 12}px`);
      });
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
          entry.target.classList.toggle("in-view", entry.isIntersecting);
        });
        schedule();
      },
      { rootMargin: "80px" },
    );
    elements.forEach((el) => observer.observe(el));
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    reduced.addEventListener("change", schedule);
    update();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
      reduced.removeEventListener("change", schedule);
      document.body.classList.remove("motion-ready");
    };
  }, []);
}
