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
  process?: string;
  mature?: boolean;
  tags: string[];
  width: number;
  height: number;
  id: string;
}
