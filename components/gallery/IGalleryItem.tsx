export default interface IImageItem {
  title: string;
  date: string;
  url: string | null;
  image: string;
  suggestive?: boolean;
  tags: string[];
  width: number;
  height: number;
}
