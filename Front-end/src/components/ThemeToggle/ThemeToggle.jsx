import { SunIcon, MoonIcon } from "../icons";
import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";

const THEME_STORAGE_KEY = "dm-theme";

function getInitialTheme() {
  let savedTheme;
  try { savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY); } catch { /* Storage may be blocked. */ }

  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }

  return window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme);
  const isDark = theme === "dark";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { window.localStorage.setItem(THEME_STORAGE_KEY, theme); } catch { /* Theme still works without persistence. */ }
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      "content", theme === "dark" ? "#151923" : "#eef1f7",
    );
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  return (
    <button
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-pressed={isDark}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <span className={styles.iconWrap} aria-hidden="true">
        <SunIcon
          className={`${styles.icon} ${isDark ? styles.iconHidden : styles.iconVisible}`}
        />

        <MoonIcon
          className={`${styles.icon} ${isDark ? styles.iconVisible : styles.iconHidden}`}
        />
      </span>
    </button>
  );
}

export default ThemeToggle;
