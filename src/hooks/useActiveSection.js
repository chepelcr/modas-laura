import { useEffect, useState } from "react";
export function useActiveSection(paused, page) {
  const [active, setActive] = useState("");
  useEffect(() => {
    if (paused) return;
    let frame;
    function update() {
      frame = undefined;
      const line =
        document.querySelector(".header").getBoundingClientRect().bottom +
        innerHeight * 0.22;
      let found = "";
      document.querySelectorAll("main section[id]").forEach((section) => {
        const r = section.getBoundingClientRect();
        if (r.top <= line && r.bottom > line) found = section.id;
      });
      setActive(found);
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
    };
  }, [paused, page]);
  return active;
}
