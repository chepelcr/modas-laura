import { forwardRef } from "react";
const classes = (...values) => values.filter(Boolean).join(" ");
/** One interaction primitive for navigation and actions. Preserves native semantics. */
export const Button = forwardRef(function Button(
  {
    as,
    href,
    variant = "primary",
    size = "normal",
    className,
    children,
    ...props
  },
  ref,
) {
  const Component = as || (href ? "a" : "button");
  return (
    <Component
      ref={ref}
      href={href}
      type={Component === "button" ? "button" : undefined}
      className={classes(
        variant === "text" ? "text-link" : "button",
        variant === "light" && "light",
        size === "small" && "small",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
});
export const IconButton = forwardRef(function IconButton(
  { label, className, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      className={classes("round-button", className)}
      {...props}
    >
      {children}
    </button>
  );
});
export function Heading({ as: Component = "h2", children, ...props }) {
  return <Component {...props}>{children}</Component>;
}
export function Eyebrow({ children, className, ...props }) {
  return (
    <span className={classes("eyebrow", className)} {...props}>
      {children}
    </span>
  );
}
export function Container({
  as: Component = "div",
  className,
  children,
  ...props
}) {
  return (
    <Component className={classes("wrap", className)} {...props}>
      {children}
    </Component>
  );
}
export function Card({
  as: Component = "article",
  className,
  children,
  ...props
}) {
  return (
    <Component className={classes("card", className)} {...props}>
      {children}
    </Component>
  );
}
export function Icon({ name = "arrow", className, ...props }) {
  const paths = {
    moon: <path d="M20 13.2A8.5 8.5 0 0 1 10.8 4 8.5 8.5 0 1 0 20 13.2Z" />,
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <ellipse cx="12" cy="12" rx="4" ry="9" />
        <path d="M3 12h18" />
      </>
    ),
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    pillow: (
      <>
        <path d="M4 5q8 2 16 0-2 7 0 14-8-2-16 0 2-7 0-14Z" />
        <path d="M8 8h8m-8 8h8" />
      </>
    ),
    message: (
      <>
        <path d="M21 11.5a8.5 8.5 0 0 1-12 7.7L3 21l1.8-6A8.5 8.5 0 1 1 21 11.5Z" />
        <path d="M8 10h8m-8 4h5" />
      </>
    ),
    check: (
      <>
        <path d="m6 12 4 4 8-8" />
        <circle cx="12" cy="12" r="10" />
      </>
    ),
    stitch: (
      <>
        <path d="M3 12h2m3 0h2m3 0h2m3 0h3" />
        <path d="m9 7 6 10m0-10L9 17" />
      </>
    ),
  };
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {paths[name] || paths.arrow}
    </svg>
  );
}

export function FilterChip({ selected, children, ...props }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className="filter-chip"
      {...props}
    >
      {children}
    </button>
  );
}
