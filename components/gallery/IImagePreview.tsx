import IGalleryEntry from "./IGalleryEntry";

export default interface IImagePreview {
  activeIndex: number;
  imageScrollIndex?: number;
  images: IGalleryEntry[];
  onThumbnailClick?: (index: number) => void;
  onDirectionClick?: (direction: number) => void;
  onOutsideClick?: () => void;
}
