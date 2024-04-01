export default interface IImageItem {
  title: string;
  date: string;
  url?: string | null;
  image: string;
  process?: {
    video: string;
    width: number;
    height: number;
  };
  suggestive?: boolean;
  tags: string[];
  width: number;
  height: number;
}
