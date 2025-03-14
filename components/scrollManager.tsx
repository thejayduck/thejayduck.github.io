import styles from "../styles/components/ScrollManager.module.scss";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

import { useState } from "react";

export default function ScrollManager() {
  const { scrollYProgress } = useScroll();
  const [isVisible, setVisibility] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    // ! Button lingers when a page is loaded. example: opening a short blog post.
    const canScroll =
      document.documentElement.scrollHeight >
      document.documentElement.clientHeight;
    setVisibility(canScroll && v >= 0.3);
  });

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.ScrollTop}
          >
            <div
              onClick={() => {
                document.body.scrollTop = 0; // Safari
                document.documentElement.scrollTop = 0;
              }}
              className={styles.progressWrap}
            >
              <i className={`${styles.icon} ri-arrow-up-fill ri-xl`} />

              <svg
                id="progress"
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
              >
                <rect
                  x="13"
                  y="13"
                  rx="10"
                  width="75"
                  height="75"
                  className={styles.bg}
                />
                <motion.rect
                  x="13"
                  y="13"
                  rx="10"
                  width="75"
                  height="75"
                  className={styles.indicator}
                  style={{ pathLength: scrollYProgress }}
                />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
