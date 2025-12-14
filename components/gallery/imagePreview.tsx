import styles from "@/styles/components/gallery/ImagePreview.module.scss";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AnimatePresence, motion, wrap } from "motion/react";
import { useDebouncedCallback } from "use-debounce";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  formatDate,
  galleryRouterSet,
  getIcon,
  getImageUrl,
} from "@/lib/helper";
import Button from "../button";
import { placeholderImage } from "../imageShimmer";
import { useToast } from "../ui/toashHandler";

import { CanvasImage } from "./canvasImage";
import ContentWarningOverlay from "./contentWarningOverlay";
import IImagePreview from "./IImagePreview";
import { IImage } from "./IGalleryEntry";

export function ImagePreview({
  images,
  visibleSensitiveImages,
  onOutsideClick,
  onRevealClick,
  activeIndex,
  imageScrollIndex, // Index on a image post with multiple images
}: IImagePreview) {
  const { showToast } = useToast();

  // ! TODO scrolling vertically right after scrolling to new post using shortcut breaks the debouncer.
  // ! TODO scrolling vertically using arrow-keys breaks the debouncer.

  const router = useRouter();
  const [debounceActive, setDebounceActive] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true);
  const [[imageIndex, direction], setImageIndex] = useState([activeIndex, 0]);
  const currentImage = images[imageIndex];
  const currentImageId = currentImage._id;
  const [isDraggingPreview, setIsDraggingPreview] = useState(false);

  const [scrollIndex, setScrollIndex] = useState(imageScrollIndex || 0);
  const scrollContainerRef = useRef<HTMLUListElement>(null);

  const debounceRouter = useDebouncedCallback((index: number) => {
    if (!debounceActive) return;
    const imageRouter = galleryRouterSet(currentImageId, index);
    imageRouter.navigateTo("gallery", router);
  }, 300);

  const outsideClickHandler = () => {
    setDebounceActive(false);
    debounceRouter.cancel();
    onOutsideClick && onOutsideClick();
  };

  useEffect(() => {
    if (currentImage.images.length <= 1) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries || entries.length == 0) return;

        const active = entries.reduce((accumulator, currentValue) => {
          return currentValue.intersectionRatio > accumulator.intersectionRatio
            ? currentValue
            : accumulator;
        }, entries[0]);

        if (active.intersectionRatio > 0.5) {
          const index = Number(active.target.getAttribute("data-index"));
          setScrollIndex((prev) => {
            if (prev == index) return prev;
            return index;
          });
          debounceRouter(index);

          console.log(index, scrollIndex);
        }
      },
      {
        root: scrollContainerRef.current,
        threshold: [0.5, 0.75, 1.0],
      }
    );

    const imageElements = scrollContainerRef.current?.querySelectorAll("li");
    if (imageElements && imageElements.length) {
      imageElements.forEach((element, index) => {
        element.setAttribute("data-index", index.toString());
        observer.observe(element);
      });
    }

    setFirstLoad(false);

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
    debounceRouter,
  ]);

  const updateImageIndex = useCallback(
    (direction: number) => {
      const wrappedImageIndex = wrap(0, images.length, imageIndex + direction);
      setImageIndex([wrappedImageIndex, direction]);
      setScrollIndex(0);
      debounceRouter(0);
    },
    [images, imageIndex, scrollIndex, debounceRouter]
  );

  const scrollToIndex = useCallback(
    (direction: number, behavior: ScrollBehavior = "auto") => {
      const targetIndex = wrap(
        0,
        currentImage.images.length,
        scrollIndex + direction
      );
      const element = scrollContainerRef.current?.querySelector(
        `[data-index="${targetIndex}"]`
      );
      console.log(`Scrolling to ${targetIndex} - ${scrollContainerRef}`);
      element?.scrollIntoView({ behavior });
      debounceRouter(targetIndex);
    },
    [currentImage.images.length, scrollIndex, debounceRouter]
  );

  const scrollToAbsoluteIndex = useCallback(
    (index: number, behavior: ScrollBehavior = "auto") => {
      setScrollIndex(index);
      debounceRouter(index);

      const element = scrollContainerRef.current?.querySelector(
        `[data-index="${index}"]`
      );

      element?.scrollIntoView({ behavior });
    },
    [debounceRouter]
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
          img._id !== currentImageId &&
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
          scrollToAbsoluteIndex(0, "auto");
          break;
        case "KeyD":
        case "ArrowRight":
          updateImageIndex(1);
          scrollToAbsoluteIndex(0, "auto");
          break;
        case "KeyW":
        case "ArrowUp":
          scrollToIndex(-1);
          break;
        case "KeyS":
        case "ArrowDown":
          scrollToIndex(1);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onOutsideClick, updateImageIndex, scrollToIndex]);

  return (
    <motion.div
      key="preview"
      className={styles.imagePreviewWrapper}
      onClick={() => {
        if (!isDraggingPreview) outsideClickHandler();
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
          onClick={outsideClickHandler}
          newPage={false}
        />
      </div>

      {/* Preview */}
      <div className={styles.imagePreview}>
        <AnimatePresence initial={false}>
          <motion.div className={styles.imageSectionWrapper}>
            {!visibleSensitiveImages[currentImageId] &&
              currentImage.sensitive && (
                <ContentWarningOverlay
                  onReveal={() => onRevealClick(currentImageId)}
                />
              )}
            {/* Indicator Dots */}
            {/* // ? Maybe make something similar to scrollbar */}
            {/* // TODO improve indicator dots to fit different screen sizes, and overflowed posts. */}
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
                        scrollToIndex(index - scrollIndex, "instant");
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
                  image={{
                    title: currentImage.title,
                    url: getImageUrl(image.id),
                    object: image,
                  }}
                  shortcuts={index === scrollIndex}
                  isSensitive={currentImage.sensitive}
                  isSensitiveContentVisible={
                    !!visibleSensitiveImages[currentImageId]
                  }
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
              title="Navigate Left"
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
              title="Navigate Right"
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
              <li
                title={`Created on ${formatDate(
                  currentImage?.timestamp ?? currentImage?.date,
                  {
                    type: "title",
                  }
                )}`}
              >
                <i className={getIcon("createdDate")} />
                <span>
                  {formatDate(currentImage?.timestamp ?? currentImage?.date, {
                    type: currentImage?.timestamp ? "timestamp" : "default",
                  })}
                </span>
              </li>
              {currentImage?.software && (
                <li title="Software">
                  <i className={getIcon("softwareUsed")} />
                  <span>{currentImage.software}</span>
                </li>
              )}
              {currentImage?.attribution && (
                <li title="Attribution">
                  <i className={getIcon("attribution")} />
                  <span>{currentImage?.attribution}</span>
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
                const mainImage: IImage = img.images[0];

                return (
                  <div
                    key={img._id}
                    className={styles.thumbnail}
                    title={"Click to view image"}
                  >
                    {img?.sensitive && !visibleSensitiveImages[img._id] && (
                      <ContentWarningOverlay
                        onReveal={() => onRevealClick(img._id)}
                        noIcon
                      />
                    )}
                    <Image
                      src={getImageUrl(mainImage.id)}
                      alt={img.title}
                      width={110}
                      height={100}
                      quality={35}
                      unoptimized={mainImage.animated}
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
          <h3>Links</h3>
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
          {/* <hr /> */}

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

          {/* Descriptive Tags */}
          {currentImage.descriptiveTags && ( // TODO implement custom dropdown with multiselect functionality for descriptive tags
            <>
              <h3 title="Experimental Feature">
                Descriptive Tags (Experimental)
              </h3>
              <div className={styles.tags}>
                {currentImage.descriptiveTags.map((tag, index) => (
                  <span key={index} className={styles.tag}>
                    <i className={`${getIcon("tag")} ri-1x ri-fw`} />
                    {tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
