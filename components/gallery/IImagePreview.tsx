import IGalleryEntry from "./IGalleryEntry";

export default interface IImagePreview {
  activeIndex: number;
  imageScrollIndex?: number;
  images: IGalleryEntry[];
  revealedImages: Record<string, boolean>;
  onThumbnailClick?: (index: number) => void;
  onDirectionClick?: (direction: number) => void;
  onOutsideClick?: () => void;
  onRevealClick: (id: string) => void;
}
