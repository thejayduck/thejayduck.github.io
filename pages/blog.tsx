import styles from "../styles/Blog.module.scss";

import Head from "next/head";
import { GetStaticPropsResult } from "next/types";

import BlogItem from "../components/blogItem";
import PageBase from "../components/pageBase";
import SocialItem from "../components/socialItem";
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
  date: string,
  image: string,
  content: string,
}

export default function Blog ({posts}: BlogProps) {
  return (
    <>
      <Head>
        <title>Blog · Arda Fevzi Armutcu</title>
      </Head>
      
      <PageBase>
        <ul className={`flex flexRight ${styles.backButton}`}>
          <SocialItem icon="bx bx-undo" label="back" title="Back to Homepage" href="/" newPage={false} />
        </ul>
        <div className={`flex flexColumn ${styles.posts}`}>
          {posts.map(q =>
            <BlogItem key={q.slug} id={q.slug} title={q.title} date={q.date} content={q.content} image={q.image} />
          )}
        </div>

      </PageBase>
    </>
  );
}