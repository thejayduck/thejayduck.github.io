import styles from "../../styles/Gallery.module.scss";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import { useState } from "react";

import { formatDate, getImageUrl, getProcessUrl } from "../../lib/helper";
import { shimmer, toBase64 } from "../imageShimmer";

import IGalleryEntry from "./IGalleryEntry";

interface GalleryItemProps {
  entry: IGalleryEntry;
  index: number;
  handleImageClick: (index: number) => void;
}

export default function GalleryItem({
  entry,
  index,
  handleImageClick,
}: GalleryItemProps) {
  const [hoveredImage, setHoveredImage] = useState<number | null>(null); // Index of the hovered image
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  // Handler for hover
  const handleMouseEnter = (index: number) => {
    setHoveredImage(null);
    setTimer(
      setTimeout(() => {
        setHoveredImage(index);
      }, 2000)
    );
  };

  const handleMouseLeave = () => {
    clearTimeout(timer as NodeJS.Timeout);
    setHoveredImage(null);
  };
  return (
    <div
      className={`${styles.galleryItem}`}
      title="Click to view image"
      onClick={() => handleImageClick(index)}
      onMouseEnter={() => handleMouseEnter(index)}
      onMouseLeave={handleMouseLeave}
      onTouchStart={() => handleMouseEnter(index)}
    >
      {entry?.mature && (
        <div className={styles.matureWarning}>
          <i className="bx bx-low-vision" />
          Content Warning
          <br />
          Hover to View
        </div>
      )}
      <figure>
        <Image
          src={getImageUrl(entry.id)}
          alt={`Drawing ${entry.title}`}
          width={entry.width}
          loading="lazy"
          height={entry.height}
          quality={65}
          placeholder={`data:image/svg+xml;base64,${toBase64(
            shimmer(entry.width, entry.height)
          )}`}
        />
        <figcaption>
          [{formatDate(entry.date)}]
          <br />
          {entry.title}
        </figcaption>
        {entry.process && (
          <>
            <i
              className={`${styles.processIndicator} bx bxs-video-recording`}
            />
            <AnimatePresence>
              {hoveredImage === index && (
                <motion.video
                  className={styles.processVideo}
                  autoPlay
                  muted
                  loop
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <source src={getProcessUrl(entry.process)} type="video/mp4" />
                  The video tag is not supported in your browser.
                </motion.video>
              )}
            </AnimatePresence>
          </>
        )}
      </figure>
    </div>
  );
}
