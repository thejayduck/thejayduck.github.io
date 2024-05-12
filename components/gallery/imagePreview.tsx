import styles from "../../styles/components/gallery/ImagePreview.module.scss";

import Image from "next/image";
import { AnimatePresence, motion, wrap } from "framer-motion";

import React, { useCallback, useEffect, useRef, useState } from "react";

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
  // Image Thumbnail Handler
  const [[thumbnailIndex, direction], setThumbnailIndex] = useState([
    startIndex || 0,
    0,
  ]);
  const imageIndex = wrap(0, images.length, thumbnailIndex);
  const selectedImage = images[imageIndex || 0];

  const updateThumbnail = useCallback(
    (index: number) => {
      setThumbnailIndex([thumbnailIndex + index, index]);
    },
    [thumbnailIndex]
  );

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented) return;

      switch (e.code) {
        case "Escape":
          onOutsideClick && onOutsideClick();
          break;
        case "KeyA":
        case "ArrowLeft":
          updateThumbnail(-1);
          break;
        case "KeyD":
        case "ArrowRight":
          updateThumbnail(1);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onOutsideClick, updateThumbnail]);

  // Idle Detector
  const idleTimeout = useRef<NodeJS.Timeout>();
  const [isIdle, setIsIdle] = useState(false);

  const resetIdle = useCallback(() => {
    clearTimeout(idleTimeout.current);
    setIsIdle(false);
    idleTimeout.current = setTimeout(() => setIsIdle(true), 3000);
  }, []);

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
  }, [thumbnailIndex, images.length, resetIdle]);

  return (
    <motion.div
      key="preview"
      className={styles.imagePreviewWrapper}
      onClick={onOutsideClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className={styles.closeButton}
        onClick={onOutsideClick}
        title={"Exit preview"}
      >
        <i className="bx bx-x" />
      </div>

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
                    <li key={post.alt} onClick={(e) => e.stopPropagation()}>
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
        onClick={(e) => e.stopPropagation()}
        // Animations
        custom={direction}
        variants={variants}
        initial="swipe"
        animate={{ x: 0, opacity: 1 }}
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
          priority={false}
        />
      </motion.div>

      {/* Preview Information */}
      <AnimatePresence>
        {!isIdle && (
          <motion.div
            className={styles.previewInformationWrapper}
            // Animations
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          >
            <div className={`${styles.previewInformation}`}>
              <span className={styles.title}>{selectedImage.title}</span>
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
