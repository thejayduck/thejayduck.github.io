interface IImagePreview {
  targetIndex: number | null;
  images: IImageItem[];
  onThumbnailClick?: (index: number) => void;
  onOutsideClick?: () => void;
}
