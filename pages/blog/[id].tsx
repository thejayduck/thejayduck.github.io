import styles from "../../styles/BlogPost.module.scss";

import { useRouter } from "next/router";
import { GetStaticPaths } from "next/types";
import remarkGfm from "remark-gfm";

import React from "react";
import ReactMarkdown from "react-markdown";

import CardPanel from "../../components/cardPanel";
import PageBase from "../../components/pageBase";

interface BlogProps {
  posts: any[]
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {

  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking" //indicates the type of fallback
  };
};

export async function getStaticProps() {
  const res = await fetch("https://gist.githubusercontent.com/thejayduck/f5c8e6b26e6ca02953eee1c4c9b9fe01/raw");
  const data = await res.json();

  return {
    props: {
      posts: data.posts,
    },
    revalidate: 10
  };
}

export default function Blog({posts}: BlogProps){
  const router = useRouter();
  const { id } = router.query;
  const post = posts[Number.parseInt(id as string)].data;

  return (
    <PageBase>
      <CardPanel id="post">
        <div className={`flex ${styles.main}`}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post}
          </ReactMarkdown>
        </div>
      </CardPanel>
    </PageBase>
  );
}