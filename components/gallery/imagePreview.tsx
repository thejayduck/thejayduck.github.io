import styles from "../../styles/components/gallery/ImagePreview.module.scss";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AnimatePresence, motion, wrap } from "framer-motion";
import { useDebouncedCallback } from "use-debounce";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  formatDate,
  formatUnixTimestamp,
  galleryRouterSet,
  getIcon,
  getImageUrl,
} from "../../lib/helper";
import Button from "../button";
import { placeholderImage } from "../imageShimmer";
import { useToast } from "../toashHandler";

import { CanvasImage } from "./canvasImage";
import IImagePreview from "./IImagePreview";

const variants = {
  initial: (direction: number) => ({
    x: direction > 0 ? "50%" : "-50%",
    scale: 1,
    opacity: 0,
  }),
  animate: { x: 0, scale: 1, opacity: 1 },
};

export function ImagePreview({
  images,
  onOutsideClick,
  activeIndex,
  imageScrollIndex, // Index on a image post with multiple images
}: IImagePreview) {
  const { showToast } = useToast();

  const router = useRouter();
  const [firstLoad, setFirstLoad] = useState(true);
  const [[imageIndex, direction], setImageIndex] = useState([activeIndex, 0]);
  const currentImage = images[imageIndex];
  const currentImageId = currentImage.images[0].id;
  const [isDraggingPreview, setIsDraggingPreview] = useState(false);

  const [scrollIndex, setScrollIndex] = useState(imageScrollIndex || 0);
  const scrollContainerRef = useRef<HTMLUListElement>(null);

  const debounceRouter = useDebouncedCallback((index: number) => {
    const imageRouter = galleryRouterSet(currentImageId, index);
    imageRouter.navigateTo("gallery", router);
  }, 300);

  useEffect(() => {
    if (currentImage.images.length <= 1) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.length === 0 || firstLoad) return;

        const active = entries.reduce((accumulator, currentValue) => {
          return currentValue.intersectionRatio > accumulator.intersectionRatio
            ? currentValue
            : accumulator;
        }, entries[0]);
        if (active.intersectionRatio > 0) {
          const index = Number(active.target.getAttribute("data-index"));
          setScrollIndex(index);
          debounceRouter(index);

          console.log(index, scrollIndex);
        }
      },
      {
        root: scrollContainerRef.current,
        threshold: 1.0,
      }
    );
    const imageElements = scrollContainerRef.current?.querySelectorAll("li");
    if (imageElements) {
      imageElements.forEach((element, index) => {
        element.setAttribute("data-index", index.toString());
        observer.observe(element);
      });
    }

    return () => {
      if (imageElements) {
        imageElements.forEach((element) => {
          element.removeAttribute("data-index");
          observer.unobserve(element);
        });
      }
    };
  }, [
    currentImage.images.length,
    scrollContainerRef,
    scrollIndex,
    firstLoad,
    debounceRouter,
  ]);

  const updateImageIndex = useCallback(
    (direction: number) => {
      const wrappedImageIndex = wrap(0, images.length, imageIndex + direction);
      setImageIndex([wrappedImageIndex, direction]);
      debounceRouter(0);
    },
    [images, imageIndex, debounceRouter]
  );
  const updateScrollIndex = useCallback(
    (direction: number) => {
      const targetIndex = wrap(
        0,
        currentImage.images.length,
        scrollIndex + direction
      );
      const element = scrollContainerRef.current?.querySelector(
        `[data-index="${targetIndex}"]`
      );
      console.log(`Scrolling to ${targetIndex} - ${scrollContainerRef}`);
      element?.scrollIntoView({ behavior: "smooth" });
      debounceRouter(targetIndex);
    },
    [currentImage.images.length, scrollIndex, debounceRouter]
  );

  useEffect(() => {
    if (firstLoad && imageScrollIndex) {
      const element = scrollContainerRef.current?.querySelector(
        `[data-index="${imageScrollIndex}"]`
      );
      element?.scrollIntoView({ behavior: "instant" });
      setScrollIndex(imageScrollIndex);
      setFirstLoad(false);
    } else {
      setScrollIndex(0);
    }
  }, [imageScrollIndex, firstLoad, currentImage]);

  useEffect(() => {
    return () => {
      debounceRouter.cancel();
    };
  }, [debounceRouter]);

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
        case "KeyW":
        case "ArrowUp":
          updateScrollIndex(-1);
          break;
        case "KeyS":
        case "ArrowDown":
          updateScrollIndex(1);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onOutsideClick, updateImageIndex, updateScrollIndex]);

  return (
    <motion.div
      key="preview"
      className={styles.imagePreviewWrapper}
      onClick={() => {
        if (!isDraggingPreview) onOutsideClick && onOutsideClick();
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Close Button */}
      <div className={styles.exitButton}>
        <Button
          icon={getIcon("close")}
          label="Close Preview (Escape)"
          onClick={onOutsideClick}
          newPage={false}
        />
      </div>

      {/* Preview */}
      <div className={styles.imagePreview}>
        <AnimatePresence initial={false}>
          <motion.div
            //! Key seems to break ref used in UL, animations are disabled until this issue is solved
            // key={currentImage.images[0].id}
            // // Animation
            // variants={variants}
            // custom={direction}
            // initial="initial"
            // animate="animate"
            // transition={{
            //   x: { type: "spring", stiffness: 300, damping: 30 },
            //   opacity: { duration: 0.2 },
            // }}
            className={styles.imageSectionWrapper}
          >
            {/* Indicator Dots */}
            <AnimatePresence>
              {currentImage.images.length > 1 && !isDraggingPreview && (
                <motion.div
                  className={styles.scrollIndexDots}
                  onClick={(e) => e.stopPropagation()}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {currentImage.images.map((_, index) => (
                    <span
                      key={index}
                      className={`${styles.dot} ${
                        index === scrollIndex ? styles.activeDot : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        updateScrollIndex(index - scrollIndex);
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
            <ul ref={scrollContainerRef} className={styles.imageSection}>
              {/* Image Canvas */}
              {currentImage.images.map((image, index) => (
                <CanvasImage
                  index={index}
                  key={image.id}
                  imageId={image.id}
                  imageUrl={getImageUrl(image.id)}
                  imageAlt={image.alt}
                  animated={image.animated || false}
                  width={image.width}
                  height={image.height}
                  shortcuts={index === scrollIndex}
                  setIsDraggingPreview={setIsDraggingPreview}
                />
              ))}
            </ul>
          </motion.div>
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
          {currentImage.description && (
            <blockquote>
              <p>{currentImage?.description}</p>
            </blockquote>
          )}

          {/* Stats */}
          <div className={styles.imageStats}>
            <ul>
              <li>
                <i className={getIcon("createdDate")} /> Created:{" "}
                {currentImage?.timestamp
                  ? formatUnixTimestamp(currentImage.timestamp)
                  : formatDate(currentImage?.date)}
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
                      quality={35}
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
                e.preventDefault();
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
              className={styles.copyLink}
            >
              <i className={`${getIcon("link")} ri-lg ri-fw`} />
              <span>Copy Link</span>
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
