// CSS optimization can serialize millisecond tokens as seconds.
export function durationInMilliseconds(value, fallback) {
  const time = value.trim();
  const match = /^(\d*\.?\d+)\s*(ms|s)$/.exec(time);
  if (!match) return fallback;
  return Number(match[1]) * (match[2] === "s" ? 1000 : 1);
}
