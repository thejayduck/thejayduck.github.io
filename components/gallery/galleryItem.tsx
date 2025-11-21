import styles from "../../styles/Gallery.module.scss";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

import { useEffect, useState } from "react";

import { formatDate, getIcon, getImageUrl, isNewImage } from "../../lib/helper";
import { shimmer, toBase64 } from "../imageShimmer";

import ContentWarningOverlay from "./contentWarningOverlay";
import IGalleryEntry from "./IGalleryEntry";

interface GalleryItemProps {
  entry: IGalleryEntry;
  index: number;
  handleImageClick: () => void;
  // Content Warning related props
  isSensitiveContentVisible: boolean;
  handleRevealClick: () => void;
}

export default function GalleryItem({
  entry,
  index,
  handleImageClick,
  // Content Warning related props
  isSensitiveContentVisible,
  handleRevealClick,
}: GalleryItemProps) {
  const indicator = (
    condition: boolean,
    title: string,
    icon: string,
    text: string = "",
    extraClass: string = ""
  ) => {
    if (!condition) return null;
    return (
      <li>
        <i
          title={title}
          className={`${styles.indicator} ${extraClass} ${getIcon(
            icon
          )} ri-fw ri-lg`}
        />
        {text && <span>{text}</span>}
      </li>
    );
  };

  return (
    <div
      className={`${styles.galleryItem}`}
      title={
        entry.images.length > 1 ? "Click to view images" : "Click to view image"
      }
      onClick={(e) => {
        handleImageClick();
      }}
    >
      {/* Sensitive Content Warning */}
      {entry?.sensitive && !isSensitiveContentVisible && (
        <ContentWarningOverlay
          onReveal={() => handleRevealClick()}
          text={entry.sensitive_description}
        />
      )}
      <figure>
        <AnimatePresence mode="wait">
          <motion.div
            style={{
              aspectRatio: `${entry.images[0].width} / ${entry.images[0].height}`, // used to keep consistent size when slideshow happens.
              position: "relative",
              width: "100%",
              height: "100%",
              backgroundColor: "var(--tertiary)",
            }}
            // key={hoveredImage}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <Image
              // src={getImageUrl(entry.images[0].id)}
              src={getImageUrl(entry.images[0].id)}
              alt={`Drawing ${entry.title}`}
              width={entry.images[0].width}
              height={entry.images[0].height}
              quality={50}
              style={{ objectFit: "contain" }} // ? use cover instead
              placeholder={`data:image/svg+xml;base64,${toBase64(
                shimmer(entry.images[0].width, entry.images[0].height)
              )}`}
              loading="lazy"
              priority={false}
              unoptimized={entry.images[0].animated}
            />
          </motion.div>
        </AnimatePresence>
        <figcaption>
          [{formatDate(entry.date)}]
          <br />
          {entry.title}
        </figcaption>
        {/* Indicators */}
        <ul className={styles.indicators}>
          {indicator(
            // New indicator
            !!entry.timestamp && isNewImage(entry.timestamp),
            "New",
            "newIndicator",
            "",
            styles.new
          )}
          {indicator(
            // Stack indicator
            entry.images.length > 1,
            `${entry.images.length} Images`,
            "stack",
            `${entry.images.length > 2 ? entry.images.length : ""}`
          )}
        </ul>
      </figure>
    </div>
  );
}
