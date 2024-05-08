import IGalleryEntry from "./IGalleryEntry";

export default interface IImagePreview {
  initialIndex: number | null;
  images: IGalleryEntry[];
  onThumbnailClick?: (index: number) => void;
  onOutsideClick?: () => void;
}
