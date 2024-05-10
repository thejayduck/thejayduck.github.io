import styles from "../../styles/components/gallery/ImagePreviewThumbnail.module.scss";

import Image from "next/image";

import { useEffect, useRef, useState } from "react";

import { placeholderImage } from "../imageShimmer";

import IImagePreview from "./IImagePreview";

// TODO fix thumbnail scroll when an image is selected from gallery
export default function ImageThumbnail({
  activeIndex, //? Find a better name
  images,
  onThumbnailClick,
  onDirectionClick,
}: IImagePreview) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const thumbnailsContainerRef = useRef<HTMLDivElement | null>(null);

  const handleThumbnailClick = (index: number) => {
    if (!isDragging && onThumbnailClick) onThumbnailClick(index);
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
    if (thumbnailsContainerRef.current && activeIndex !== null) {
      const selectedThumbnail =
        thumbnailsContainerRef.current.children[activeIndex];
      if (selectedThumbnail) {
        selectedThumbnail.scrollIntoView({
          behavior: "smooth",
          inline: "center",
        });
      }
    }
  }, [activeIndex]);

  return (
    <>
      {/* Page Arrows */}
      <div className={styles.arrowWrapper}>
        <div
          className={`${styles.arrow} ${styles.leftArrow}`}
          onClick={(e) => {
            onDirectionClick && onDirectionClick(-1);
            e.stopPropagation();
          }}
        >
          <i className="bx bx-left-arrow-alt" />
        </div>
        <div
          className={`${styles.arrow} ${styles.rightArrow}`}
          onClick={(e) => {
            onDirectionClick && onDirectionClick(1);
            e.stopPropagation();
          }}
        >
          <i className="bx bx-right-arrow-alt" />
        </div>
      </div>
      <div
        key="thumbnailWrapper"
        className={styles.thumbnailWrapper}
        ref={thumbnailsContainerRef}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        {images.map((thumbnail, index) => (
          <div
            className={`
                  ${styles.thumbnails} 
                  ${index === activeIndex ? styles.selected : ""}
                  ${thumbnail.suggestive ? styles.suggestiveFilter : ""}
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
              placeholder={placeholderImage(110, 100)}
              width={110}
              height={100}
            />
          </div>
        ))}
      </div>
    </>
  );
}
