import styles from "../styles/Gallery.module.scss";

import Image from "next/image";
import { motion } from "framer-motion";

import React, { useEffect, useRef, useState } from "react";

import gallery from "../docs/json/gallery.json";

// TODO Cleanup
interface ImagePreviewProps {
  imageIndex: number | null;
  onClose?: () => void;
}

export function ImagePreview({ imageIndex, onClose }: ImagePreviewProps) {
  // Thumbnail drag state
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<number | null>(null);

  // State for selected thumbnail index
  const [selectedThumbnailIndex, setSelectedThumbnailIndex] = useState<
    number | null
  >(imageIndex);
  const thumbnailsContainerRef = useRef<HTMLDivElement | null>(null);

  const handleThumbnailClick = (index: number) => {
    if (!isDragging) setSelectedThumbnailIndex(index);
  };

  // Thumbnail drag event handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragStart !== null && thumbnailsContainerRef.current) {
      setIsDragging(true);
      const delta = e.clientX - dragStart;
      thumbnailsContainerRef.current.scrollLeft =
        (thumbnailsContainerRef.current.scrollLeft || 0) - delta;
      setDragStart(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setDragStart(null);
    setTimeout(() => {
      setIsDragging(false);
    }, 50);
  };

  // Thumbnail scroll wheel event handler
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const scrollAmount = 0.5; // Adjust the scroll amount as needed

    if (thumbnailsContainerRef.current) {
      e.preventDefault(); // Prevent vertical scroll
      thumbnailsContainerRef.current.scrollLeft += e.deltaY * scrollAmount;
    }
  };

  // Scroll to selected thumbnail on change
  useEffect(() => {
    if (thumbnailsContainerRef.current && selectedThumbnailIndex !== null) {
      const selectedThumbnail =
        thumbnailsContainerRef.current.children[selectedThumbnailIndex];
      if (selectedThumbnail) {
        selectedThumbnail.scrollIntoView({
          behavior: "smooth",
          inline: "center",
        });
      }
    }
  }, [selectedThumbnailIndex]);

  return (
    <>
      {imageIndex != null && (
        <motion.div
          key="preview"
          className={styles.imagePreview}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Preview */}
          {/* TODO fix image preview loading (broken with new nextjs version) */}
          <motion.div
            className={styles.imagePreviewWrapper}
            key={`${gallery[selectedThumbnailIndex || 0].image} `}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          >
            <Image
              key={"Image"}
              src={gallery[selectedThumbnailIndex || 0].image}
              alt={gallery[selectedThumbnailIndex || 0].title}
              style={{
                objectFit: "contain",
              }}
              fill
            />
          </motion.div>
          {/* Thumbnails */}
          {/* TODO Animate */}
          <div
            key="thumbnails"
            className={styles.thumbnails}
            ref={thumbnailsContainerRef}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
          >
            {gallery.map((thumbnail, index) => (
              <div
                className={`
                  ${styles.thumbnailWrapper} 
                  ${index === selectedThumbnailIndex ? styles.selected : ""}
                `}
                key={index}
                onClick={() => handleThumbnailClick(index)}
              >
                <Image
                  className={`${styles.thumbnail}`}
                  src={thumbnail.image}
                  alt={`Thumbnail ${index + 1}`}
                  style={{ objectFit: "cover", objectPosition: "top" }}
                  quality={35}
                  width={100}
                  height={100}
                />
              </div>
            ))}
          </div>
          {/* TODO Add Image Information */}
        </motion.div>
      )}
    </>
  );
}
