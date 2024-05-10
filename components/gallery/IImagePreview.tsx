import IGalleryEntry from "./IGalleryEntry";

export default interface IImagePreview {
  activeIndex: number | null;
  images: IGalleryEntry[];
  onThumbnailClick?: (index: number) => void;
  onDirectionClick?: (direction: number) => void;
  onOutsideClick?: () => void;
}
