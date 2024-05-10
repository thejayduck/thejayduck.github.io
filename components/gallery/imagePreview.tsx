import styles from "../../styles/components/gallery/ImagePreview.module.scss";

import Image from "next/image";
import { AnimatePresence, motion, wrap } from "framer-motion";

import React, { useEffect, useState } from "react";

import { formatDate } from "../../lib/helper";
import Button from "../button";
import { shimmer, toBase64 } from "../imageShimmer";

import IImagePreview from "./IImagePreview";
import ImageThumbnail from "./imageThumbnail";

const variants = (direction: boolean = false, isFirst: boolean = false) => ({
  swipe: {
    opacity: 0,
    x: isFirst ? 0 : direction ? -100 : 100,
  },
  infoHidden: { opacity: 0, height: 0 },
});

export function ImagePreview({
  activeIndex, //? Find a better name
  images,
  onOutsideClick,
}: IImagePreview) {
  const [[index, direction], setIndex] = useState([0, 0]);
  const imageIndex = wrap(0, images.length, index);

  const updateIndex = (newIndex: number) => {
    setIndex([index + newIndex, newIndex]);
  };

  const [selectedThumbnailIndex, setSelectedThumbnailIndex] = useState<
    number | null
  >(activeIndex);
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
      {/* Arrows */}
      <div
        className={`${styles.arrow} ${styles.leftArrow}`}
        onClick={(e) => {
          const newIndex = (selectedThumbnailIndex || 0) - 1;
          setSelectedThumbnailIndex(
            newIndex >= 0 ? newIndex : images.length - 1
          );
          e.stopPropagation();
        }}
      >
        <i className="bx bx-left-arrow-alt" />
      </div>
      <div
        className={`${styles.arrow} ${styles.rightArrow}`}
        onClick={(e) => {
          const newIndex = (selectedThumbnailIndex || 0) + 1;
          setSelectedThumbnailIndex(
            newIndex >= 0 ? newIndex : images.length - 1
          );
          e.stopPropagation();
        }}
      >
        <i className="bx bx-right-arrow-alt" />
      </div>
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
          variants={variants(
            selectedThumbnailIndex != null &&
              prevIndex > selectedThumbnailIndex,
            activeIndex == selectedThumbnailIndex
          )}
          initial="swipe"
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
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
            placeholder={`data:image/svg+xml;base64,${toBase64(
              shimmer(selectedImage.width, selectedImage.height)
            )}`}
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
              variants={variants()}
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
                activeIndex={selectedThumbnailIndex}
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
