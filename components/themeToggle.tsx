"use client";
import styles from "@/styles/components/ThemeToggle.module.scss";

import { AnimatePresence, motion, TargetAndTransition } from "motion/react";

import { useEffect, useState } from "react";

import { getIcon } from "@/lib/helper";

const iconVariants: Record<string, TargetAndTransition> = {
  initial: { y: -20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
  exit: { y: 20, opacity: 0, transition: { duration: 0.2 } },
};

export default function ThemeToggle() {
  const [mount, setMount] = useState(false);
  const themes = ["light", "dark", "gruvbox"];

  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      return savedTheme || themes[0];
    }
    return themes[0];
  });

  const themeIcon: Record<string, string> = {
    light: getIcon("lightTheme"),
    dark: getIcon("darkTheme"),
    gruvbox: getIcon("gruvboxTheme"),
  };

  const toggleTheme = () => {
    setTheme((prev) => {
      const index = themes.indexOf(prev);
      return themes[(index + 1) % themes.length];
    });
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
          title={`Switch to next theme: ${
            themes[(themes.indexOf(theme) + 1) % themes.length]
          }`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={theme}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={iconVariants}
            >
              <i className={themeIcon[theme]} />
            </motion.div>
          </AnimatePresence>
        </button>
      )}
    </>
  );
}
