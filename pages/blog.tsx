import styles from "../styles/Blog.module.scss";

import Head from "next/head";
import { GetStaticPropsResult } from "next/types";

import BlogItem from "../components/blog/blogItem";
import IBlogProps, { IBlogPostProps } from "../components/blog/IBlogProps";
import Button from "../components/button";
import PageBase from "../components/pageBase";
import GetPosts from "../lib/getPosts";

export async function getStaticProps(): Promise<
  GetStaticPropsResult<IBlogPostProps>
> {
  const postsData = GetPosts();
  return {
    props: {
      posts: postsData,
    },
    revalidate: 60,
  };
}

export default function Blog({ posts }: IBlogPostProps) {
  return (
    <>
      <Head>
        <title>Blog · Arda Fevzi Armutcu</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Arda Fevzi Armutcu's Blog" />
      </Head>
      <PageBase>
        <ul className={"flex flexRight backButton"}>
          <Button
            icon="bx bx-undo"
            label="back to homepage"
            title="Back to Homepage"
            href="/"
            newPage={false}
          />
        </ul>

        <section>
          <ul className={styles.posts}>
            {posts.map((post: IBlogProps, index: number) => (
              <BlogItem key={index} {...post} />
            ))}
          </ul>
        </section>
      </PageBase>
    </>
  );
}
