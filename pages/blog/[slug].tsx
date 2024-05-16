import styles from "../../styles/BlogPost.module.scss";

import Head from "next/head";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticPropsResult } from "next/types";
import { AnimatePresence, motion } from "framer-motion";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import React, { useState } from "react";
import Markdown from "react-markdown";

import {
  AnchorItemProps,
  TableOfContent,
} from "../../components/blog/tableOfContent";
import Button from "../../components/button";
import PageBase from "../../components/pageBase";
import GetPosts from "../../lib/getPosts";
import {
  countWords,
  getAnchors,
  groupTreeBy,
  readTime,
} from "../../lib/helper";

interface BlogProps {
  posts: BlogPostProps[];
}

interface BlogPostProps {
  slug: string;
  title: string;
  date: string;
  image: string;
  content: string;
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};

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

export default function Blog({ posts }: BlogProps) {
  const router = useRouter();
  const { slug } = router.query;

  const post = posts.find(({ slug: targetSlug }) => targetSlug == slug);

  if (!post) throw new Error("Unable to find post.");

  const wordCount = countWords(post.content);
  const avgTime = readTime(wordCount);
  const anchors = getAnchors(post.content);
  const groupedAnchors = groupTreeBy(
    anchors,
    (el) => el.level
  ) as AnchorItemProps[];

  const [anchorToggle, setAnchorToggle] = useState(false);

  return (
    <>
      <Head>
        <title>{post.title} · Arda Fevzi Armutcu</title>
        <meta name="description" content="Arda Fevzi Armutcu's Blog Post" />
      </Head>

      <PageBase>
        <ul className={"flex flexRight backButton"}>
          <Button
            icon="bx bx-undo"
            label="back to posts"
            title="Back to Posts"
            href="/blog"
            newPage={false}
          />
        </ul>
        <section className={`${styles.mainSection}`}>
          <div className={`cardItem ${styles.post}`}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <span>
                {post.date} 🗓️ | {wordCount} Words 📄 | ~{avgTime} Minutes ⏱️
              </span>
              <hr />
              <Markdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeSlug, rehypeSanitize]}
              >
                {post.content}
              </Markdown>
            </motion.div>
          </div>
        </section>
      </PageBase>
      <div className={styles.anchorWrapper}>
        <AnimatePresence>
          {anchorToggle && (
            <motion.div // Anchors
              className={`${styles.anchorList}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{
                height: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
            >
              <TableOfContent anchors={groupedAnchors} />
            </motion.div>
          )}
        </AnimatePresence>
        <div // Toggle Table of Content
          className={styles.anchorToggle}
          onClick={() => setAnchorToggle((prev) => !prev)}
          title={"Table of Content"}
        >
          <i className={anchorToggle ? "bx bx-x" : "bx bx-menu"} />
        </div>
      </div>
    </>
  );
}
