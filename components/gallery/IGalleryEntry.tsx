interface IExternal {
  url: string;
  alt: string;
  icon: string;
}

interface IImage {
  alt?: string;
  width: number;
  height: number;
  id: string;
}

export default interface IGalleryEntry {
  title: string;
  description?: string;
  date: string;
  timestamp?: number;
  software?: string;
  external?: IExternal[];
  process?: string;
  mature?: boolean;
  tags: string[];
  images: IImage[];
}
