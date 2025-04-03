import styles from "../../styles/Gallery.module.scss";

import { useEffect, useRef } from "react";

import { getIcon } from "../../lib/helper";

import GalleryItem from "./galleryItem";
import IGalleryEntry from "./IGalleryEntry";

interface IGalleryGridProps {
  handleImageClick: (id: string) => void;
  gallery: IGalleryEntry[];
}

export const GalleryGrid: React.FC<IGalleryGridProps> = ({
  handleImageClick,
  gallery,
}) => {
  const galleryContainerRef = useRef<HTMLDivElement>(null);

  // Effect to calculate and update column span on window resize
  useEffect(() => {
    const calculateColumnSpan = () => {
      const galleryItems = Array.from(
        galleryContainerRef.current?.querySelectorAll(
          `.${styles.galleryItem}`
        ) || []
      );

      galleryItems.forEach((element, index) => {
        const galleryItem = element as HTMLElement;
        const item = gallery[index].images[0]; // Main image is the first in the array

        // Calculate the ratio and apply styles
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
    <>
      <div className={styles.gallery} ref={galleryContainerRef}>
        {gallery.map((galleryEntry: IGalleryEntry, index: number) => (
          <GalleryItem
            key={index}
            entry={galleryEntry}
            index={index}
            handleImageClick={() => handleImageClick(galleryEntry.images[0].id)}
          />
        ))}
      </div>
      <hr />
      <center className={styles.endNotice}>
        <span>You&apos;ve reached the end </span>

        <i className={getIcon("emojiSad")}></i>
      </center>
    </>
  );
};
