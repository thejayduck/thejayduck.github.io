import styles from "../styles/Blog.module.scss";

import Head from "next/head";
import { GetStaticPropsResult } from "next/types";

import BlogItem from "../components/blogItem";
import Button from "../components/button";
import PageBase from "../components/pageBase";
import GetPosts from "../lib/getPosts";

export async function getStaticProps(): Promise<
  GetStaticPropsResult<BlogProps>
> {
  const postsData = GetPosts();

  return {
    props: {
      posts: postsData,
    },
    revalidate: 60,
  };
}

//? Combine blog.tsx and blogitem.tsx props
interface BlogProps {
  posts: BlogPostProps[];
}

interface BlogPostProps {
  slug: string;
  title: string;
  date: string;
  image: string;
  content: string;
  summary: string;
  tags: string[];
}

export default function Blog({ posts }: BlogProps) {
  return (
    <>
      <Head>
        <title>Blog · Arda Fevzi Armutcu</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Arda Fevzi Armutcu's Blog" />
      </Head>
      <PageBase>
        <ul className={`flex flexRight ${styles.backButton}`}>
          <Button
            icon="bx bx-undo"
            label="back to homepage"
            title="Back to Homepage"
            href="/"
            newPage={false}
          />
        </ul>

        <section>
          <ul className={` ${styles.posts}`}>
            {posts.map((q) => (
              <BlogItem
                key={q.slug}
                id={q.slug}
                title={q.title}
                date={q.date}
                image={q.image}
                content={q.content}
                summary={q.summary}
                tags={q.tags}
              />
            ))}
          </ul>
        </section>
      </PageBase>
    </>
  );
}
