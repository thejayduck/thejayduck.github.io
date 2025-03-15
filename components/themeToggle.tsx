import styles from "../styles/components/ThemeToggle.module.scss";

import { AnimatePresence, motion } from "framer-motion";

import { useEffect, useState } from "react";

import { getIcon } from "../lib/helper";

const iconVariants = {
  initial: {
    y: -20,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
  exit: {
    y: 20,
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

export default function ThemeToggle() {
  const [mount, setMount] = useState(false);
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
    setMount(true);
  }, [theme]);

  return (
    <>
      {mount && (
        <button
          className={styles.toggle}
          key="themeToggle"
          onClick={toggleTheme}
          data-theme={theme}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={theme}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={iconVariants}
            >
              <i
                className={`${
                  theme === "dark" ? getIcon("lightMode") : getIcon("darkMode")
                }`}
              />
            </motion.div>
          </AnimatePresence>
        </button>
      )}
    </>
  );
}
