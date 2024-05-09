interface IExternal {
  url: string;
  alt: string;
  icon: string;
}

export default interface IGalleryEntry {
  title: string;
  date: string;
  external?: IExternal[];
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
