import styles from "../styles/Gallery.module.scss";

import Image from "next/image";
import { motion } from "framer-motion";

import React, { useEffect, useRef, useState } from "react";

import { formatDate } from "../lib/helper";

// TODO Separate CSS and Thumbnail(?)

interface GalleryItem {
  title: string;
  date: string;
  url: string | null;
  image: string;
  tags: string[];
  width: number;
  height: number;
}

interface ImagePreviewProps {
  imageIndex: number | null;
  filteredGallery: GalleryItem[];
  onClose?: () => void;
}

export function ImagePreview({
  imageIndex,
  filteredGallery,
  onClose,
}: ImagePreviewProps) {
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
    const scrollSpeed = 0.5; // Adjusts Horizontal Scroll Speed

    if (thumbnailsContainerRef.current) {
      // e.preventDefault(); //* Prevent vertical scroll (disabled due to errors)
      thumbnailsContainerRef.current.scrollLeft += e.deltaY * scrollSpeed;
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
            key={`${filteredGallery[selectedThumbnailIndex || 0].image} `}
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
              src={filteredGallery[selectedThumbnailIndex || 0].image}
              alt={filteredGallery[selectedThumbnailIndex || 0].title}
              style={{
                objectFit: "contain",
              }}
              fill
            />
          </motion.div>

          {/* Preview Information */}
          <div className={`${styles.previewInformation}`}>
            <span className={styles.title}>
              {filteredGallery[selectedThumbnailIndex || 0].title}
            </span>
            <br />
            <span>
              {formatDate(filteredGallery[selectedThumbnailIndex || 0].date)}
            </span>
            <br />
            <div className={styles.tags}>
              {filteredGallery[selectedThumbnailIndex || 0].tags.map(
                (tag, index) => (
                  <span key={index} className={styles.tag}>
                    #{tag}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Thumbnails */}
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
            {filteredGallery.map((thumbnail, index) => (
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
                  width={110}
                  height={100}
                />
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
}
