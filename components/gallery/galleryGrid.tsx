import styles from "../../styles/Gallery.module.scss";

import { getIcon } from "../../lib/helper";

import GalleryItem from "./galleryItem";
import IGalleryEntry from "./IGalleryEntry";

interface IGalleryGridProps {
  containerRef: React.RefObject<HTMLDivElement>;
  handleImageClick: (id: string) => void;
  gallery: IGalleryEntry[];
}

export const GalleryGrid: React.FC<IGalleryGridProps> = ({
  containerRef,
  handleImageClick,
  gallery,
}) => {
  return (
    <>
      <div className={styles.gallery} ref={containerRef}>
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
