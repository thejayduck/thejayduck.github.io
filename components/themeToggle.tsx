import styles from "../styles/components/ThemeToggle.module.scss";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      const systemPreference = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      return savedTheme || systemPreference;
    }
    return "light";
  });

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.dataset.theme = theme;
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  return (
    <button
      className={styles.toggle}
      key="themeToggle"
      onClick={toggleTheme}
      data-theme={theme}
      title="Toggle theme (WIP)"
    >
      {theme === "dark" ? (
        <i className="bx bxs-sun" />
      ) : (
        <i className="bx bxs-moon" />
      )}
    </button>
  );
}
