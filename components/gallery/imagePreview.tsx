import styles from "../../styles/components/gallery/ImagePreview.module.scss";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import React, { useEffect, useState } from "react";

import { formatDate } from "../../lib/helper";
import { shimmer, toBase64 } from "../imageShimmer";

import IImagePreview from "./IImagePreview";
import ImageThumbnail from "./imageThumbnail";

export function ImagePreview({
  initialIndex, //? Find a better name
  images,
  onOutsideClick,
}: IImagePreview) {
  const [selectedThumbnailIndex, setSelectedThumbnailIndex] = useState<
    number | null
  >(initialIndex);
  const [prevIndex, setPrevIndex] = useState<number>(0);

  const onThumbnailClick = (index: number) => {
    setPrevIndex(selectedThumbnailIndex || 0);
    setSelectedThumbnailIndex(index);
  };
  const selectedImage = images[selectedThumbnailIndex || 0];

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
    window.addEventListener("mousedown", resetIdle);
    window.addEventListener("scroll", resetIdle);

    resetIdle();

    return () => {
      window.removeEventListener("mousemove", resetIdle);
      window.removeEventListener("touchmove", resetIdle);
      window.removeEventListener("mousedown", resetIdle);
      window.removeEventListener("scroll", resetIdle);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <motion.div
        key="preview"
        className={styles.imagePreview}
        onClick={onOutsideClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Preview */}
        <motion.div
          className={styles.imagePreviewWrapper}
          key={`${selectedImage.image} `}
          initial={{
            opacity: 0,
            x:
              selectedThumbnailIndex && prevIndex > selectedThumbnailIndex
                ? -100
                : 100,
          }}
          animate={{ opacity: 1, x: 0 }}
          exit={{
            opacity: 0,
            x: 100,
          }}
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
        >
          <Image
            key={"Image"}
            src={selectedImage.image}
            alt={selectedImage.title}
            style={{
              objectFit: "contain",
            }}
            fill
            placeholder={`data:image/svg+xml;base64,${toBase64(
              shimmer(selectedImage.width, selectedImage.height)
            )}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 75vw" //? Not sure if this helps at all
            priority={false}
          />
        </motion.div>

        {/* Preview Information */}
        <AnimatePresence>
          {!isIdle && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              style={{ overflow: "hidden", display: "block", width: "100%" }}
            >
              <div className={`${styles.previewInformation}`}>
                {selectedImage?.url && (
                  <Link
                    title="View in DeviantArt"
                    passHref
                    target="_blank"
                    href={selectedImage?.url || ""}
                    className={`${styles.external} bx bxl-deviantart`}
                    onClick={(e) => e.stopPropagation}
                  />
                )}
                <span className={styles.title}>{selectedImage.title}</span>
                <br />
                <span>{formatDate(selectedImage.date)}</span>
                <br />
                <div className={styles.tags}>
                  {selectedImage.tags.map((tag, index) => (
                    <span key={index} className={styles.tag}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Thumbnails */}
              <ImageThumbnail
                initialIndex={selectedThumbnailIndex}
                images={images}
                onThumbnailClick={(index) => {
                  onThumbnailClick(index || 0);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
