import styles from "../styles/components/BlogItem.module.scss";

import remarkGfm from "remark-gfm";

import React from "react";
import ReactMarkdown from "react-markdown";

import CardPanel from "./cardPanel";

interface BlogItemProps {
    title: string,
    description: string,
    image?: string
    id: number
}

export default function BlogItem({title, description, image, id}: BlogItemProps){
  return (
    <CardPanel>
      <a
        title={title}
        href={`/blog/${id}`}
        target="_self"
        rel="noreferrer"
        className={`${styles.projectWrap}`}
      >
        <img
          className={styles.image}
          alt={`${title} Cover`}
          src={image}
          height={256}
          width={500}
        />
        <div className={styles.details}>
          <h2>{title ?? "No Title"}</h2>
          <div className={styles.description}>
            <ReactMarkdown disallowedElements={["img"]} remarkPlugins={[remarkGfm]}>
              {description}
            </ReactMarkdown>
          </div>
        </div>
      </a>
    </CardPanel>
  );
}