import styles from "../styles/Gallery.module.scss";

import Image from "next/image";

import { useEffect, useRef, useState } from "react";

import { ImageDataProps } from "./imageDataProps";

// ToDo Cleanup
interface ImagePreviewProps {
  imageData: ImageDataProps;
  imageList: Array<{
    image: string;
    width: number;
    height: number;
  }>;
  onClose?: () => void;
}

export function ImagePreview({
  imageData,
  imageList,
  onClose,
}: ImagePreviewProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(
    imageData.index
  );
  const thumbnailsRef = useRef<HTMLDivElement | null>(null);

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    if (thumbnailsRef.current && selectedIndex !== null) {
      const selectedThumbnail = thumbnailsRef.current.children[selectedIndex];
      if (selectedThumbnail) {
        selectedThumbnail.scrollIntoView({
          behavior: "smooth",
          inline: "center",
        });
      }
    }
  }, [selectedIndex]);

  return (
    <>
      {imageData && (
        <div key="preview" className={styles.imagePreview} onClick={onClose}>
          {/* Preview */}
          <div className={styles.imagePreviewWrapper}>
            <Image
              src={imageList[selectedIndex || 0].image}
              width={imageData.width}
              height={imageData.height}
              alt={imageData.title}
              blurDataURL={imageList[selectedIndex || 0].image}
              placeholder="blur"
              objectFit="contain"
              layout="fill"
            />
          </div>

          {/* Thumbnails */}
          {/* TODO Animate */}
          <div
            className={styles.thumbnails}
            ref={thumbnailsRef}
            onClick={(e) => e.stopPropagation()}
          >
            {imageList.map((thumbnail, index) => (
              <div
                className={`${styles.thumbnailWrapper} ${
                  index === selectedIndex ? styles.selected : ""
                }`}
                key={index}
              >
                <Image
                  className={`${styles.thumbnail}`}
                  quality={25}
                  src={thumbnail.image}
                  alt={`Thumbnail ${index + 1}`}
                  width="100%"
                  height="100%"
                  objectFit="cover"
                  objectPosition="top"
                  onClick={() => handleThumbnailClick(index)}
                />
              </div>
            ))}
          </div>
          {/* TODO Add Image Information */}
        </div>
      )}
    </>
  );
}
