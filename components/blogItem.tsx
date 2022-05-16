import styles from "../styles/components/BlogItem.module.scss";

import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import React from "react";
import ReactMarkdown from "react-markdown";

import CardPanel from "./cardPanel";

interface BlogItemProps {
    title: string,
    description: string,
    image?: string
    id: string
}

export default function BlogItem({title, description, image, id}: BlogItemProps){
  return (
    <a
      title={`${title} - Click to Read More`}
      href={`/blog/${id}`}
      target="_self"
      rel="noreferrer"
      className={`cardItem flex ${styles.projectWrap}`}
    >
      <img
        className={styles.image}
        alt={`${title} Cover`}
        src={image}
      />
      <div className={styles.details}>
        <div className={styles.description}>
          <ReactMarkdown disallowedElements={["img"]} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {description}
          </ReactMarkdown>
        </div>
      </div>
    </a>
  );
}