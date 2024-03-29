import styles from "../../styles/components/gallery/ImagePreview.module.scss";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import React, { useEffect, useState } from "react";

import { formatDate } from "../../lib/helper";

import IImagePreview from "./IImagePreview";
import ImageThumbnail from "./imageThumbnail";

export function ImagePreview({
  targetIndex,
  images,
  onOutsideClick,
}: IImagePreview) {
  const [selectedThumbnailIndex, setSelectedThumbnailIndex] = useState<
    number | null
  >(targetIndex);

  const onThumbnailClick = (index: number) => {
    setSelectedThumbnailIndex(index);
  };

  // Idle Detector
  const [isIdle, setIsIdle] = useState(false);
  let idleTimeout: NodeJS.Timeout;

  const resetIdle = () => {
    clearTimeout(idleTimeout);
    setIsIdle(false);
    idleTimeout = setTimeout(() => setIsIdle(true), 3000);
  };

  useEffect(() => {
    window.addEventListener("mousemove", resetIdle);
    window.addEventListener("touchmove", resetIdle);

    resetIdle();

    return () => {
      window.removeEventListener("mousemove", resetIdle);
      window.removeEventListener("touchmove", resetIdle);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {targetIndex != null && (
        <motion.div
          key="preview"
          className={styles.imagePreview}
          onClick={onOutsideClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Preview */}
          {/* TODO fix image preview loading (broken with new nextjs version) */}
          <motion.div
            className={styles.imagePreviewWrapper}
            key={`${images[selectedThumbnailIndex || 0].image} `}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          >
            <Image
              key={"Image"}
              src={images[selectedThumbnailIndex || 0].image}
              alt={images[selectedThumbnailIndex || 0].title}
              style={{
                objectFit: "contain",
              }}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 75vw" //? Not sure if this helps at all
              priority={false}
            />
          </motion.div>

          {/* Preview Information */}
          <AnimatePresence>
            {!isIdle && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`${styles.previewInformation}`}
              >
                {images[selectedThumbnailIndex || 0]?.url && (
                  <Link
                    title="View in DeviantArt"
                    passHref
                    target="_blank"
                    href={images[selectedThumbnailIndex || 0]?.url || ""}
                    className={`${styles.external} bx bxl-deviantart`}
                    onClick={(e) => e.stopPropagation}
                  />
                )}
                <span className={styles.title}>
                  {images[selectedThumbnailIndex || 0].title}
                </span>
                <br />
                <span>
                  {formatDate(images[selectedThumbnailIndex || 0].date)}
                </span>
                <br />
                <div className={styles.tags}>
                  {images[selectedThumbnailIndex || 0].tags.map(
                    (tag, index) => (
                      <span key={index} className={styles.tag}>
                        #{tag}
                      </span>
                    )
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Thumbnails */}
          <ImageThumbnail
            targetIndex={selectedThumbnailIndex}
            images={images}
            onThumbnailClick={(index) => onThumbnailClick(index || 0)}
          />
        </motion.div>
      )}
    </>
  );
}
