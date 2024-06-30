import styles from "../styles/Blog.module.scss";

import Head from "next/head";
import { GetStaticPropsResult } from "next/types";
import { motion } from "framer-motion";

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
        <meta
          property="og:image"
          content="https://ardarmutcu.com/api/og?title=blog"
        />
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
          <motion.ul
            className={styles.posts}
            initial="hidden"
            animate="visible"
            layout
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
            }}
          >
            {posts.map((post: IBlogProps, index: number) => (
              <BlogItem key={index} {...post} />
            ))}
          </motion.ul>
        </section>
      </PageBase>
    </>
  );
}
