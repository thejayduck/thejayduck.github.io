import styles from "../../styles/BlogPost.module.scss";

import Head from "next/head";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticPropsResult } from "next/types";
// @ts-ignore
import rehypeFigure from "@microflash/rehype-figure";
import { motion } from "framer-motion";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import Markdown from "react-markdown";

import { IBlogPostProps } from "../../components/blog/IBlogProps";
import TableOfContentToggle from "../../components/blog/tableOfContentToggle";
import PageBase from "../../components/pageBase";
import GetPosts from "../../lib/getPosts";
import { countWords, readTime } from "../../lib/helper";

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};

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
  const router = useRouter();
  const { slug } = router.query;

  const post = posts.find(({ slug: targetSlug }) => targetSlug == slug);

  if (!post) throw new Error("Unable to find post.");

  const wordCount = countWords(post.content);
  // const avgTime = readTime(wordCount);

  return (
    <>
      <Head>
        <title>{`${post.title} · Arda Fevzi Armutcu`}</title>
        <meta name="description" content="Arda Fevzi Armutcu's Blog Post" />
        <meta
          property="og:image"
          content={`https://ardarmutcu.com/api/ogPost?title=${post.title}&date=${post.date}&content=${post.summary}`}
        />
      </Head>

      <PageBase backPath="/blog" label="Back to Posts">
        <section className={`${styles.mainSection}`}>
          <div className={`cardItem ${styles.post}`}>
            {/* <div className={styles.stats}>
              <span>
                {post.date} <i className="bx bxs-calendar" />
              </span>
              <span>
                {wordCount} Words <i className="bx bxs-book" />
              </span>
              <span>
                ~{avgTime} Minutes <i className="bx bxs-stopwatch" />
              </span>
            </div> */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Markdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[
                  rehypeRaw,
                  rehypeSlug,
                  rehypeSanitize,
                  rehypeFigure,
                ]}
              >
                {post.content}
              </Markdown>
            </motion.div>
          </div>
        </section>
        <TableOfContentToggle content={post.content} />
      </PageBase>
    </>
  );
}
