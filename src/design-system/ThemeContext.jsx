import { createContext, useContext, useEffect, useRef, useState } from "react";
import { durationInMilliseconds } from "./motion.js";
const ThemeContext = createContext(null);
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const settle = useRef();
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || "light");
    return () => clearTimeout(settle.current);
  }, []);
  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;
    root.dataset.themeTransition = "true";
    clearTimeout(settle.current);
    settle.current = setTimeout(
      () => {
        delete root.dataset.themeTransition;
      },
      durationInMilliseconds(
        getComputedStyle(root).getPropertyValue("--duration-theme"),
        650,
      ) + 50,
    );
    setTheme(next);
    document.documentElement.dataset.theme = next;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", next === "dark" ? "#101f1b" : "#23564f");
    try {
      localStorage.setItem("modas-laura-theme", next);
    } catch {
      /* Storage may be disabled. */
    }
  }
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
export function useTheme() {
  return useContext(ThemeContext);
}
