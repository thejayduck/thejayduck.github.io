"use client";
import styles from "@/styles/components/ui/ThemeToggle.module.scss";

import { AnimatePresence, motion, TargetAndTransition } from "motion/react";

import { useEffect, useState } from "react";

import { getIcon, getLocalSavedItem, saveLocalItem } from "@/lib/helper";

interface ThemeTypeProps {
  name: string;
  icon: string;
}

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

  const themeDict: Record<string, ThemeTypeProps> = {
    light: { icon: getIcon("lightTheme"), name: "Bliss" },
    dark: { icon: getIcon("darkTheme"), name: "Onyx" },
    gruvbox: { icon: getIcon("gruvboxTheme"), name: "Gruvbox" },
  };

  const themeCollection = Object.keys(themeDict);
  const [theme, setTheme] = useState<string>(themeCollection[0]);

  const nextTheme =
    themeCollection[
      (themeCollection.indexOf(theme) + 1) % themeCollection.length
    ];

  useEffect(() => {
    getLocalSavedItem<string>("theme", setTheme);
    setMount(true);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.dataset.theme = theme;
      saveLocalItem("theme", theme);
    }
    setMount(true);
  }, [theme]);

  return (
    <>
      {mount && (
        <button
          className={styles.toggle}
          key="themeToggle"
          onClick={() => setTheme(nextTheme)}
          data-theme={theme}
          title={`Switch to ${themeDict[nextTheme].name} Theme`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={theme}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={iconVariants}
            >
              <i className={themeDict[theme].icon} />
            </motion.div>
          </AnimatePresence>
        </button>
      )}
    </>
  );
}
