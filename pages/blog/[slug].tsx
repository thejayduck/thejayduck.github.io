import styles from "../../styles/BlogPost.module.scss";

import Head from "next/head";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticPropsResult } from "next/types";
import { AnimatePresence, motion } from "framer-motion";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";

import Button from "../../components/button";
import PageBase from "../../components/pageBase";
import GetPosts from "../../lib/getPosts";
import {
  countWords,
  getAnchors,
  groupTreeBy,
  readTime,
  truncate,
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

interface AnchorItemProps {
  level: number;
  id: string;
  content: string;
  children?: AnchorItemProps[];
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

  // useEffect(() => {
  //   console.log(anchors);
  //   console.log(groupedAnchors);
  // }, []);

  const [sidebar, setSideBar] = useState(true);

  const RenderTree = ({ nodes }: { nodes: AnchorItemProps[] }) => (
    <ul>
      {nodes.map((node) => (
        <li key={node.id}>
          <a href={`#${node.id}`}>{node.content}</a>
          {node.children && <RenderTree nodes={node.children} />}
        </li>
      ))}
    </ul>
  );

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
        <section className={`flex ${styles.mainSection}`}>
          <motion.div
            layoutId={post.slug}
            initial={false}
            className={`cardItem ${styles.post}`}
          >
            <motion.div
              layout="size"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <span>
                {post.date} 🗓️ | {wordCount} Words 📄 | ~{avgTime} Minutes ⏱️
              </span>
              <hr />
              <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {post.content}
              </Markdown>
            </motion.div>
          </motion.div>
        </section>
      </PageBase>
      <div
        className={styles.anchorList}
        // animate={{ flex: sidebar ? "1 0 250px" : 0, width: "0px" }}
        // transition={{ stiffness: 200 }}
      >
        <AnimatePresence>
          {sidebar && (
            <motion.div
              className={`${styles.anchors}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ stiffness: 200 }}
            >
              <RenderTree nodes={groupedAnchors} />
            </motion.div>
          )}
        </AnimatePresence>
        {/* <Button
          icon={sidebar ? "bx bx-arrow-from-left" : "bx bx-arrow-from-right"}
          label="hide"
          title={sidebar ? "Hide Sidebar" : ""}
          href={"#"}
          onClick={() => setSideBar((prev) => !prev)}
          newPage={false}
        /> */}
      </div>
    </>
  );
}
