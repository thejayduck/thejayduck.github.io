import styles from "../../styles/components/gallery/ImagePreview.module.scss";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AnimatePresence, motion, wrap } from "framer-motion";

import React, { useCallback, useEffect, useMemo, useState } from "react";

import {
  dragHandler,
  formatDate,
  getIcon,
  getImageUrl,
} from "../../lib/helper";
import Button from "../button";
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
  const currentImageId = currentImage.images[0].id;

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

  const getSeedHash = (seed: string) => {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash << 5) - hash + seed.charCodeAt(i);
      hash |= 0;
    }
    return hash;
  };

  const shuffleArray = useCallback((array: any[], seed: string) => {
    const random = getSeedHash(seed);
    const shuffled: any[] = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.abs(random) % (i + 1);
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  }, []);

  const relatedImages = useMemo(() => {
    const shuffledImages = shuffleArray([...images], currentImageId);

    return shuffledImages
      .filter(
        (img: any) =>
          img.images[0].id !== currentImageId &&
          img.tags.some((tag: string) => currentImage.tags.includes(tag))
      )
      .slice(0, 9);
  }, [images, currentImageId, currentImage, shuffleArray]);

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
      {/* Close Button */}
      <div className={styles.exitButton}>
        <Button
          icon={getIcon("close")}
          label="close preview"
          onClick={onOutsideClick}
          newPage={false}
        />
      </div>

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
            drag="x"
            dragSnapToOrigin
            onDragEnd={(_, info) => {
              dragHandler(_, info, updateImageIndex);
            }}
          >
            {currentImage.images?.map((image, index) => (
              <motion.li key={index} className={styles.image}>
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
              <i className={getIcon("leftArrow")} />
            </button>
            <span>
              {imageIndex + 1} / {images.length}
            </span>
            <button
              onClick={() => updateImageIndex(1)}
              disabled={imageIndex === images.length - 1}
              className={styles.navButton}
            >
              <i className={getIcon("rightArrow")} />
            </button>
          </div>
          <span>
            <i className={getIcon("at")} />
            thejayduck
          </span>
          <hr />
          <span className={styles.title}>{currentImage?.title}</span>

          {/* Stats */}
          <div className={styles.imageStats}>
            <ul>
              <li>
                <i className={getIcon("createdDate")} /> Created:{" "}
                {formatDate(currentImage?.date)}
              </li>
              {currentImage?.software && (
                <li>
                  <i className={getIcon("softwareUsed")} /> Software:{" "}
                  {currentImage.software}
                </li>
              )}
            </ul>
          </div>

          {/* Related Images */}
          <div className={styles.relatedImages}>
            <h3>
              <i className={getIcon("moreImages")} /> More
            </h3>
            <div className={styles.thumbnailGrid}>
              {relatedImages.map((img) => {
                const mainImage = img.images[0];
                return (
                  <div
                    key={mainImage.id}
                    className={styles.thumbnail}
                    title={"Click to view image"}
                  >
                    {img?.mature && (
                      <div className={styles.matureWarning}>
                        <i className={getIcon("censorship")} />
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
          <hr />
          <div className={styles.links}>
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
                          `The link to "${post.alt}" has been opened in a new tab.`,
                          getIcon("external")
                        );
                      }}
                      title={`View on ${post.alt}`}
                      aria-label={`View on ${post.alt}`}
                      href={post.url}
                      passHref
                      target="_blank"
                    >
                      <i className={`${post.icon} ri-lg ri-fw`} />
                    </Link>
                  )
              )}
            <Link
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(window.location.href);
                showToast(
                  "Image Link Copied!",
                  "The image link has been copied to your clipboard.",
                  getIcon("imageFile")
                );
              }}
              title="Copy Link"
              aria-label="Copy Link"
              href="#"
              passHref
            >
              <i className={`${getIcon("link")} ri-lg ri-fw`} />
            </Link>
          </div>
          <hr />

          {/* Tags */}
          <h3>Tags</h3>
          <div className={styles.tags}>
            {currentImage.tags.map((tag, index) => (
              <span key={index} className={styles.tag}>
                <i className={`${getIcon("tag")} ri-1x ri-fw`} />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
