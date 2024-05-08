import IGalleryEntry from "./IGalleryEntry";

export default interface IImagePreview {
  activeIndex: number | null;
  images: IGalleryEntry[];
  onThumbnailClick?: (index: number) => void;
  onOutsideClick?: () => void;
}
