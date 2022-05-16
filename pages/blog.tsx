import styles from "../styles/Blog.module.scss";

import { GetStaticPropsResult } from "next/types";

import BlogItem from "../components/blogItem";
import PageBase from "../components/pageBase";
import GetPosts from "../lib/getPosts";

export async function getStaticProps(): Promise<GetStaticPropsResult<BlogProps>> {
  const postsData = GetPosts();
  
  return {
    props: {
      posts: postsData,
    },
    revalidate: 60,
  };

}

interface BlogProps {
    posts: BlogPostProps[] 
}

interface BlogPostProps {
  slug: string,
  title: string,
  image: string,
  content: string,
}

export default function Blog ({posts}: BlogProps) {
  return (
    <PageBase>
      <div className={`flex flexColumn flexWrap ${styles.main}`}>
        {posts.map(q =>
          <BlogItem key={q.slug} id={q.slug} title={q.title} description={q.content} image={q.image} />
        )}
      </div>
    </PageBase>
  );
}