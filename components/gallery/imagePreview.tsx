import styles from "../../styles/components/gallery/ImagePreview.module.scss";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AnimatePresence, motion, wrap } from "framer-motion";

import React, { useCallback, useEffect, useState } from "react";

import { dragHandler, formatDate, getImageUrl } from "../../lib/helper";
import { placeholderImage } from "../imageShimmer";
import { useToast } from "../toashHandler";

import IImagePreview from "./IImagePreview";

const variants = {
  initial: (direction: number) => ({
    x: direction > 0 ? "50%" : "-50%",
    scale: 1,
    opacity: 0,
  }),
  animate: { x: 0, scale: 1, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? "-50%" : "50%",
    scale: 0.8,
    opacity: 0,
  }),
};

export function ImagePreview({
  images,
  onOutsideClick,
  activeIndex,
}: IImagePreview) {
  const { showToast } = useToast();

  const router = useRouter();
  const [[imageIndex, direction], setImageIndex] = useState([activeIndex, 0]);
  const currentImage = images[imageIndex];

  const updateImageIndex = useCallback(
    (direction: number) => {
      const wrappedImageIndex = wrap(0, images.length, imageIndex + direction);
      setImageIndex([wrappedImageIndex, direction]);
      router.replace(
        `/gallery/?id=${images[wrappedImageIndex].images[0].id}`,
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
        <AnimatePresence initial={false} custom={direction}>
          <motion.ul
            className={styles.imageSection}
            key={currentImage.title}
            // Animation
            variants={variants}
            custom={direction}
            initial="initial"
            animate="animate"
            // exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          >
            {currentImage.images?.map((image, index) => (
              <motion.li
                key={index}
                className={styles.image}
                drag="x"
                dragSnapToOrigin
                onDragEnd={(_, info) => {
                  dragHandler(_, info, updateImageIndex);
                }}
              >
                <Image
                  src={getImageUrl(image.id)}
                  alt={image.alt ?? "Image"}
                  width={image.width}
                  height={image.height}
                  onClick={(e) => e.stopPropagation()}
                  placeholder={placeholderImage(image.width, image.height)}
                  priority={false}
                />
                {image.alt && (
                  <span className={styles.imageAlt}>{image.alt}</span>
                )}
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>

        {/* Preview Information */}
        <div
          className={styles.previewInformationWrapper}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.navigation}>
            <button
              onClick={() => updateImageIndex(-1)}
              disabled={imageIndex === 0}
              className={styles.navButton}
            >
              <i className="bx bxs-left-arrow" />
            </button>
            <span>
              {imageIndex + 1} / {images.length}
            </span>
            <button
              onClick={() => updateImageIndex(1)}
              disabled={imageIndex === images.length - 1}
              className={styles.navButton}
            >
              <i className="bx bxs-right-arrow" />
            </button>
          </div>
          <span>@thejayduck</span>
          <hr />
          <span className={styles.title}>{currentImage?.title}</span>

          {/* Stats */}
          <div className={styles.imageStats}>
            <ul>
              {/* <li>
                <i className="bx bx-ruler" /> {currentImage?.width}x
                {currentImage?.height}px (Downscaled)
              </li> */}
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
              <i className="bx bx-images" /> Related (WIP)
            </h3>
            <div className={styles.thumbnailGrid}>
              {images
                .filter(
                  (img) =>
                    img.images[0].id !== currentImage.images[0].id &&
                    img.tags.some((tag) => currentImage.tags.includes(tag))
                )
                .slice(0, 9)
                .map((img) => {
                  const mainImage = img.images[0];
                  return (
                    <div key={mainImage.id} className={styles.thumbnail}>
                      {img?.mature && (
                        <div className={styles.matureWarning}>
                          <i className="bx bx-low-vision" />
                        </div>
                      )}
                      <Image
                        src={getImageUrl(mainImage.id)}
                        alt={img.title}
                        width={110}
                        height={100}
                        quality={40}
                        placeholder={placeholderImage(110, 100)}
                        onClick={() =>
                          updateImageIndex(images.indexOf(img) - imageIndex)
                        }
                      />
                    </div>
                  );
                })}
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
                      onClick={(e) => {
                        e.stopPropagation();
                        showToast(
                          "Link Opened!",
                          `The link to "${post.alt}" has been opened in a new tab.`
                        );
                      }}
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
                showToast(
                  "Image Link Copied!",
                  "The image link has been copied to your clipboard."
                );
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
