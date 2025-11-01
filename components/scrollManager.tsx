"use client";
import styles from "../styles/components/ScrollManager.module.scss";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";

import { useState } from "react";

import { getIcon } from "../lib/helper";

export default function ScrollManager() {
  const { scrollYProgress } = useScroll();
  const [isVisible, setVisibility] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    // ! Button lingers when a page is loaded. example: opening a short blog post.
    // ? Only show if the page is a certain height ?
    const canScroll =
      document.documentElement.scrollHeight >
      document.documentElement.clientHeight;
    setVisibility(canScroll && v >= 0.3);
  });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles.scrollTop}
          title="Scroll to Top"
          style={
            {
              "--progress": scrollYProgress,
            } as React.CSSProperties
          }
          onClick={() => {
            document.body.scrollTop = 0; // Safari
            document.documentElement.scrollTop = 0;
          }}
        >
          <i className={getIcon("upArrow")} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
