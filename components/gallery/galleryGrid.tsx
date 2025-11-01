import styles from "../../styles/Gallery.module.scss";

import { useEffect, useRef, useState } from "react";

import GalleryItem from "./galleryItem";
import IGalleryEntry from "./IGalleryEntry";

interface IGalleryGridProps {
  handleImageClick: (id: string) => void;
  handleRevealClick: (id: string) => void;
  gallery: IGalleryEntry[];
  visibleSensitiveImages: Record<string, boolean>;
}

export const GalleryGrid: React.FC<IGalleryGridProps> = ({
  handleRevealClick,
  handleImageClick,
  gallery,
  visibleSensitiveImages,
}) => {
  const galleryContainerRef = useRef<HTMLDivElement>(null);

  // Effect to calculate and update column span on window resize
  useEffect(() => {
    const calculateColumnSpan = () => {
      const galleryItems = Array.from(
        galleryContainerRef.current?.querySelectorAll(
          `.${styles.galleryItem}`
        ) || []
      ) as HTMLElement[];

      gallery.forEach((entry, index) => {
        const galleryItem = galleryItems[index];

        if (!galleryItem || !entry?.images?.[0]) return;

        const item = entry.images[0];
        const ratio = item.width / item.height;
        const baseSize = 15; // em
        galleryItem.style.flexBasis = `calc(${ratio} * ${baseSize}em)`;
        galleryItem.style.flexGrow = `${ratio * 100}`;
      });
    };

    calculateColumnSpan();
    window.addEventListener("resize", calculateColumnSpan);
    window.addEventListener("load", calculateColumnSpan);

    return () => {
      window.removeEventListener("resize", calculateColumnSpan);
      window.addEventListener("load", calculateColumnSpan);
    };
  }, [gallery]);

  return (
    <div className={styles.gallery} ref={galleryContainerRef}>
      {gallery.map((galleryEntry: IGalleryEntry, index: number) => (
        <GalleryItem
          key={index}
          entry={galleryEntry}
          index={index}
          handleImageClick={() => handleImageClick(galleryEntry.images[0].id)}
          // Content Warning Filter
          isSensitiveContentVisible={
            !!visibleSensitiveImages[galleryEntry.images[0].id]
          }
          handleRevealClick={() => handleRevealClick(galleryEntry.images[0].id)}
        />
      ))}
    </div>
  );
};
