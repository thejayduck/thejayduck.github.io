export default interface IProjectItem {
  title: string;
  image: string;
  description: string;
  type: string;
  genre?: string | null;
  year: number;
  tags: string[];
  links: {
    title: string;
    url: string;
    icon: string;
  }[];
}
