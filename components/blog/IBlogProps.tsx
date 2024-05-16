export interface IBlogPostProps {
  posts: IBlogProps[];
}

export default interface IBlogProps {
  slug: string;
  title: string;
  date: string;
  image: string;
  content: string;
  summary: string;
  tags: string[];
}
