import styles from "../../styles/Gallery.module.scss";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import { useRef, useState } from "react";

import {
  formatDate,
  getIcon,
  getImageUrl,
  getProcessUrl,
  isNewImage,
} from "../../lib/helper";
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
  //? Improve process video handling ?

  const [hoveredImage, setHoveredImage] = useState<number | null>(null); // Index of the hovered image
  const processTooltipRef = useRef<HTMLDivElement>(null);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  // Handler for hover
  const handleMouseEnter = (index: number) => {
    setHoveredImage(null);

    if (entry.process)
      setTimer(
        setTimeout(() => {
          setHoveredImage(index);
          processTooltipRef.current?.removeAttribute("title");
        }, 500)
      );
  };

  const handleMouseLeave = () => {
    processTooltipRef.current?.setAttribute(
      "title",
      entry.images.length > 1 ? "Click to view images" : "Click to view image"
    );
    clearTimeout(timer as NodeJS.Timeout);
    setHoveredImage(null);
  };
  return (
    <div
      className={`${styles.galleryItem}`}
      title={
        entry.images.length > 1 ? "Click to view images" : "Click to view image"
      }
      ref={processTooltipRef}
      onClick={() => handleImageClick(index)}
      onMouseEnter={() => handleMouseEnter(index)}
      onMouseLeave={handleMouseLeave}
      onTouchStart={() => handleMouseEnter(index)}
    >
      {entry?.mature && (
        <div className={styles.matureWarning}>
          <i className={getIcon("censorship")} />
          Content Warning
          <br />
          Hover to View
        </div>
      )}
      <figure>
        <Image
          src={getImageUrl(entry.images[0].id)}
          alt={`Drawing ${entry.title}`}
          width={entry.images[0].width}
          loading="lazy"
          height={entry.images[0].height}
          quality={50}
          placeholder={`data:image/svg+xml;base64,${toBase64(
            shimmer(entry.images[0].width, entry.images[0].height)
          )}`}
        />
        {entry.images.length > 2 && (
          <ul className={styles.stackPreviewWrapper}>
            {entry.images.slice(1, 4).map((image, i) => (
              <li key={i} className={styles.stackPreview}>
                <Image
                  src={getImageUrl(image.id)}
                  alt={`Drawing ${entry.title} - Image ${i + 2}`}
                  width={24}
                  height={24}
                  loading="lazy"
                  quality={25}
                  placeholder={`data:image/svg+xml;base64,${toBase64(
                    shimmer(24, 24)
                  )}`}
                />
              </li>
            ))}
          </ul>
        )}
        <figcaption>
          [{formatDate(entry.date)}]
          <br />
          {entry.title}
        </figcaption>
        {/* Indicators */}
        <ul className={styles.indicators}>
          {entry.timestamp && isNewImage(entry.timestamp) && (
            <li>
              <i
                title="New"
                className={`${styles.indicator} ${styles.new} ${getIcon(
                  "newIndicator"
                )} ri-fw ri-lg`}
              />
            </li>
          )}
          {entry.images.length > 1 && (
            <li>
              <i
                title={`${entry.images.length} Images`}
                className={`${styles.indicator} ${getIcon(
                  "stack"
                )} ri-fw ri-lg`}
              />
              {entry.images.length > 2 && <span>{entry.images.length}</span>}
            </li>
          )}
          {entry.process && (
            <li>
              <i
                title="Process Available"
                className={`${styles.indicator} ${getIcon(
                  "recording"
                )} ri-fw ri-lg`}
              />
            </li>
          )}
        </ul>

        {entry.process && (
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
        )}
      </figure>
    </div>
  );
}
