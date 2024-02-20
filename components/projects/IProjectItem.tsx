export default interface IProjectItem {
  title: string;
  image: string;
  description: string;
  type: string;
  genre: string;
  year: number;
  tags: string[];
  links: {
    title: string;
    url: string;
    icon: string;
  }[];
}
