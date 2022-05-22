import styles from "../../styles/BlogPost.module.scss";

import Head from "next/head";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticPropsResult } from "next/types";
import { AnimatePresence, motion } from "framer-motion";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

import PageBase from "../../components/pageBase";
import SocialItem from "../../components/socialItem";
import GetPosts from "../../lib/getPosts";
import { countWords, getAnchors, readTime, truncate } from "../../lib/helper";

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

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking" //indicates the type of fallback
  };
};

export async function getStaticProps(): Promise<GetStaticPropsResult<BlogProps>> {
  const postsData = GetPosts();

  return {
    props: {
      posts: postsData,
    },
    revalidate: 60,
  };

}

export default function Blog({posts}: BlogProps){
  const router = useRouter();
  const { slug } = router.query;

  const post = posts.find(({slug: targetSlug}) => targetSlug == slug);

  if(!post)
    throw new Error("Unable to find post.");

  const wordCount = countWords(post.content);
  const avgTime = readTime(wordCount);
  const anchors = getAnchors(post.content);

  const [sidebar, setSideBar] = useState(true);

  const animation = {
    show: {
      opacity: 1, 
      transition: {
        type: "tween",
        duration: 0.5,
        ease: "easeInOut"
      } 
    }
  };

  return (
    <>
      <Head>
        <title>{post.title} · Arda Fevzi Armutcu</title>
      </Head>
    
      <PageBase>
        <ul className={`flex flexRight ${styles.backButton}`}>
          <SocialItem icon="bx bx-undo" label="back" title="Back to Posts" href="/blog" newPage={false} />
        </ul>
        <section className={`flex ${styles.mainSection}`}> 
          <motion.div
            layoutId={post.slug}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            initial={false}

            className={`cardItem ${styles.post}`}
          >
            <motion.div
              layout="size"
              initial={{ opacity: 0 }}
              variants={animation}
              animate={"show"}
            >
              <span>
                {post.date} 🗓️ | {wordCount} Words 📄 | ~{avgTime} Minutes ⏱️
              </span>
              <hr />
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {post.content}
              </ReactMarkdown>
            </motion.div>
          </motion.div>
          <motion.ul 
            className={`flex flexColumn ${styles.anchors}`} 
            style={{ flex: sidebar ? "1 0 250px" : "0" }}

            initial={{ opacity: 0 }}
            variants={animation}
            animate={"show"}
          >
            {sidebar && anchors.map(q =>
              <SocialItem 
                key={q.id} 
                icon="bx bx-link-alt" 
                label={q.id} 
                title={truncate(q.content, 25)} 
                href={`#${q.id}`} 
                newPage={false} 
              />
            )}
            <SocialItem 
              icon={sidebar ? "bx bx-arrow-from-left" : "bx bx-arrow-from-right"} 
              label="hide" 
              title={sidebar ? "Hide Sidebar" : ""} 
              href={"#"} 
              onClick={() => setSideBar(prev => !prev)}
              newPage={false} 
            />
          </motion.ul>
        </section>
      </PageBase>
    </>

  );
}