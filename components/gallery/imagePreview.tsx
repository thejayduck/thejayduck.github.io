import styles from "../../styles/components/gallery/ImagePreview.module.scss";

import Image from "next/image";
import { AnimatePresence, motion, wrap } from "framer-motion";

import React, { useEffect, useState } from "react";

import { formatDate } from "../../lib/helper";
import Button from "../button";
import { placeholderImage } from "../imageShimmer";

import IImagePreview from "./IImagePreview";
import ImageThumbnail from "./imageThumbnail";

const variants = {
  swipe: (direction: number) => {
    return {
      x: direction == 0 ? 0 : direction > 0 ? 100 : -100,
      opacity: 0,
    };
  },
  infoHidden: { opacity: 0, height: 0 },
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      x: direction == 0 ? 0 : direction < 0 ? 100 : -100,
      opacity: 0,
    };
  },
};

export function ImagePreview({
  activeIndex: startIndex, //? Find a better name
  images,
  onOutsideClick,
}: IImagePreview) {
  const [[thumbnailIndex, direction], setThumbnailIndex] = useState([
    startIndex || 0,
    0,
  ]);
  const imageIndex = wrap(0, images.length, thumbnailIndex);

  const updateThumbnail = (index: number) => {
    setThumbnailIndex([thumbnailIndex + index, index]);
  };
  const selectedImage = images[imageIndex || 0];

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
    <motion.div
      key="preview"
      className={styles.imagePreviewWrapper}
      onClick={onOutsideClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <AnimatePresence>
        {!isIdle && selectedImage.external && (
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.external}
          >
            {selectedImage.external &&
              selectedImage.external.map(
                (post) =>
                  post && (
                    <li key={post.alt}>
                      <Button
                        icon={post.icon}
                        title={`View on ${post.alt}`}
                        label={`View on ${post.alt}`}
                        href={post.url}
                        newPage={true}
                      />
                    </li>
                  )
              )}
          </motion.ul>
        )}
      </AnimatePresence>

      {/* Preview */}
      <motion.div
        className={styles.imagePreview}
        key={`${selectedImage.image} `}
        // Animations
        custom={direction}
        variants={variants}
        initial="swipe"
        animate="center"
        exit="exit"
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
      >
        <Image
          key={"Image"}
          src={selectedImage.image}
          alt={selectedImage.title}
          width={selectedImage.width}
          height={selectedImage.height}
          placeholder={placeholderImage(
            selectedImage.width,
            selectedImage.height
          )}
          // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 75vw"
          priority={false}
        />
      </motion.div>

      {/* Preview Information */}
      <AnimatePresence>
        {!isIdle && (
          <motion.div
            className={styles.previewInformationWrapper}
            // Animations
            variants={variants}
            initial="infoHidden"
            animate={{ opacity: 1, height: "auto" }}
            exit="infoHidden"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          >
            <div className={`${styles.previewInformation}`}>
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
              activeIndex={imageIndex}
              images={images}
              onThumbnailClick={(index) => {
                // TODO Fix direction
                setThumbnailIndex([index, index]);
              }}
              onDirectionClick={(direction) => updateThumbnail(direction)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
