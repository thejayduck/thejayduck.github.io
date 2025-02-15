import styles from "../../styles/components/gallery/ImagePreview.module.scss";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AnimatePresence, motion, wrap } from "framer-motion";

import React, { useCallback, useEffect, useRef, useState } from "react";

import { dragHandler, formatDate, getImageUrl } from "../../lib/helper";
import { placeholderImage } from "../imageShimmer";

import IImagePreview from "./IImagePreview";

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
    opacity: 0,
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
      router.replace(
        `/gallery/?id=${images[wrappedImageIndex].id}`,
        undefined,
        { scroll: false }
      );
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

  const [isHidden, setIsHidden] = useState(false);

  return (
    <motion.div
      key="preview"
      className={styles.imagePreviewWrapper}
      onClick={onOutsideClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Preview */}
      <div className={styles.imagePreview}>
        <div className={styles.imageSection}>
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              className={styles.image}
              key={currentImage.id}
              // ? Fix transition animations
              // Animation
              // variants={variants}
              // custom={direction}
              initial="initial"
              animate="animate"
              exit="exit"
              // transition={{
              //   x: { type: "spring", stiffness: 300, damping: 30 },
              //   opacity: { duration: 0.2 },
              // }}
              // Drag Event
              drag="x"
              dragSnapToOrigin
              onDragEnd={(_, info) => {
                dragHandler(_, info, updateImageIndex);
              }}
            >
              <Image
                key={"Image"}
                src={getImageUrl(currentImage.id)}
                alt={currentImage.title}
                width={currentImage.width}
                height={currentImage.height}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsHidden(!isHidden);
                }}
                placeholder={placeholderImage(
                  currentImage.width,
                  currentImage.height
                )}
                priority={false}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Preview Information */}
        <div
          className={styles.previewInformationWrapper}
          onClick={(e) => e.stopPropagation()}
        >
          <span>@thejayduck</span>
          <hr />
          <span className={styles.title}>{currentImage?.title}</span>

          {/* Stats */}
          <div className={styles.imageStats}>
            <ul>
              <li>
                <i className="bx bx-ruler" /> {currentImage?.width}x
                {currentImage?.height}px (Downscaled)
              </li>
              <li>
                <i className="bx bx-calendar" /> Created:{" "}
                {formatDate(currentImage?.date)}
              </li>
              {currentImage?.software && (
                <li>
                  <i className="bx bx-paint" /> Software:{" "}
                  {currentImage.software}
                </li>
              )}
            </ul>
          </div>

          {/* Related Images */}
          <div className={styles.relatedImages}>
            <h3>
              <i className="bx bx-images" /> Related
            </h3>
            <div className={styles.thumbnailGrid}>
              {images
                .filter(
                  (img) =>
                    img.id !== currentImage.id &&
                    img.tags.some((tag) => currentImage.tags.includes(tag))
                )
                .slice(0, 9)
                .map((img) => (
                  <div key={img.id} className={styles.thumbnail}>
                    {img?.mature && (
                      <div className={styles.matureWarning}>
                        <i className="bx bx-low-vision" />
                      </div>
                    )}
                    <Image
                      src={getImageUrl(img.id)}
                      alt={img.title}
                      width={110}
                      height={100}
                      quality={40}
                      onClick={() =>
                        updateImageIndex(images.indexOf(img) - imageIndex)
                      }
                    />
                  </div>
                ))}
            </div>
          </div>

          <br />

          {/* Links */}
          <div className={styles.links}>
            <hr />
            {currentImage.external &&
              currentImage.external.map(
                (post) =>
                  post && (
                    <Link
                      key={post.alt}
                      onClick={(e) => e.stopPropagation()}
                      title={`View on ${post.alt}`}
                      aria-label={`View on ${post.alt}`}
                      href={post.url}
                      passHref
                      target="_blank"
                    >
                      <i className={post.icon} />
                    </Link>
                  )
              )}
            <Link
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(window.location.href);
              }}
              title="Copy Link"
              aria-label="Copy Link"
              href="#"
              passHref
            >
              <i className="bx bx-link" />
            </Link>
          </div>
          <hr />

          {/* Tags */}
          <h3>Tags</h3>
          <div className={styles.tags}>
            {currentImage.tags.map((tag, index) => (
              <span key={index} className={styles.tag}>
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
