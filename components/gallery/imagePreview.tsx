import styles from "../../styles/components/gallery/ImagePreview.module.scss";

import Image from "next/image";
import { useRouter } from "next/router";
import { AnimatePresence, motion, wrap } from "framer-motion";

import React, { useCallback, useEffect, useRef, useState } from "react";

import { dragHandler } from "../../lib/helper";
import Button from "../button";
import { placeholderImage } from "../imageShimmer";

import IImagePreview from "./IImagePreview";
import ImageThumbnail from "./imageThumbnail";

const variants = {
  initial: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    scale: 1,
    opacity: 0,
  }),
  animate: { x: 0, scale: 1, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    scale: 0.8,
    opacity: 0.2,
  }),
};

export function ImagePreview({
  images,
  onOutsideClick,
  activeIndex,
}: IImagePreview) {
  const router = useRouter();
  const [[imageIndex, direction], setImageIndex] = useState([activeIndex, 0]);
  const currentImage = images[imageIndex];

  const updateImageIndex = useCallback(
    (direction: number) => {
      const wrappedImageIndex = wrap(0, images.length, imageIndex + direction);
      setImageIndex([wrappedImageIndex, direction]);
      router.push(`/gallery/?id=${images[wrappedImageIndex].id}`);
    },
    [images, router, imageIndex]
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
          updateImageIndex(-1);
          break;
        case "KeyD":
        case "ArrowRight":
          updateImageIndex(1);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onOutsideClick, updateImageIndex]);

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
  }, [images.length, resetIdle]);

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
        className={styles.exitButton}
        onClick={onOutsideClick}
        title={"Exit preview"}
      >
        <i className="bx bx-x" />
      </div>

      <AnimatePresence>
        {!isIdle && (
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.external}
          >
            {currentImage.external &&
              currentImage.external.map(
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
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          className={styles.imagePreview}
          key={currentImage.id}
          // Animation
          variants={variants}
          custom={direction}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          // Drag Event
          drag="x"
          dragSnapToOrigin
          onDragEnd={(_, info) => {
            dragHandler(_, info, updateImageIndex);
          }}
        >
          <Image
            key={"Image"}
            src={currentImage.image}
            alt={currentImage.title}
            width={currentImage.width}
            height={currentImage.height}
            onClick={(e) => e.stopPropagation()}
            placeholder={placeholderImage(
              currentImage.width,
              currentImage.height
            )}
            priority={false}
          />
        </motion.div>
      </AnimatePresence>

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
              <span className={styles.title}>{currentImage.title}</span>
              <br />
              <div className={styles.tags}>
                {currentImage.tags.map((tag, index) => (
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
                updateImageIndex(index - imageIndex);
              }}
              onDirectionClick={(direction) => updateImageIndex(direction)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
