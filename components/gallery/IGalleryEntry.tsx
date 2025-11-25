interface IExternal {
  url: string;
  alt: string;
  icon: string;
}

interface IImage {
  animated?: boolean;
  alt?: string;
  width: number;
  height: number;
  id: string;
}

export default interface IGalleryEntry {
  _id: string;
  hidden?: boolean;
  title: string;
  description?: string;
  attribution?: string;
  date: string;
  timestamp?: number;
  software?: string;
  external?: IExternal[];
  sensitive?: boolean;
  sensitive_description?: string;
  tags: string[];
  images: IImage[];
}
