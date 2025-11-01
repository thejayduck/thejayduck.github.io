import styles from "../../styles/components/TableOfContent.module.scss";

import { AnimatePresence, motion } from "motion/react";

import { useEffect, useRef, useState } from "react";

import { getAnchors, getIcon, groupTreeBy } from "../../lib/helper";

import { AnchorItemProps, TableOfContent } from "./tableOfContent";

export default function TableOfContentToggle({ content }: { content: string }) {
  // Get all anchors
  const anchors = getAnchors(content);
  const groupedAnchors = groupTreeBy(
    anchors,
    (el) => el.level
  ) as AnchorItemProps[];

  // Anchor toggle
  const [anchorToggle, setAnchorToggle] = useState(false);
  const anchorRef = useRef(null);
  const outsideClickIgnore = useRef(null);

  // Outside click handler
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        anchorRef.current &&
        !(anchorRef.current as HTMLElement).contains(event.target as Node) &&
        (!outsideClickIgnore.current || //? Not sure if there is a better way to do this
          !(outsideClickIgnore.current as HTMLElement).contains(
            event.target as Node
          ))
      ) {
        setAnchorToggle(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.anchorWrapper}>
      <AnimatePresence>
        {anchorToggle && (
          <motion.div // Anchors
            ref={anchorRef}
            className={`${styles.anchorList}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              height: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          >
            <TableOfContent anchors={groupedAnchors} />
          </motion.div>
        )}
      </AnimatePresence>
      <div // Toggle Table of Content
        ref={outsideClickIgnore}
        className={styles.anchorToggle}
        onClick={() => setAnchorToggle((prev) => !prev)}
        title={"Table of Content"}
      >
        <i
          className={anchorToggle ? getIcon("close") : getIcon("burgerMenu")}
        />
      </div>
    </div>
  );
}
