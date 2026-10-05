import { useEffect, useRef } from "react";

export function PortraitLabel({ children }) {
  const label = useRef(null);
  useEffect(() => {
    const element = label.current;
    // Rotation raises the left corner and lowers the right corner.
    // Compensate for that rise so both outer edges have the same inset.
    const observer = new ResizeObserver(([entry]) => {
      const width = entry.borderBoxSize?.[0]?.inlineSize ?? element.offsetWidth;
      element.style.setProperty(
        "--label-rise",
        `${width * Math.sin(Math.PI / 30)}px`,
      );
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return (
    <span ref={label} className="portrait-tag">
      {children}
    </span>
  );
}
