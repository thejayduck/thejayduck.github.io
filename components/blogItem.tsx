import styles from "../styles/components/BlogItem.module.scss";

import Link from "next/link";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import React from "react";
import ReactMarkdown from "react-markdown";

import { countWords, readTime } from "../lib/helper";

interface BlogItemProps {
    title: string,
    date: string,
    description: string,
    image?: string
    id: string
}

export default function BlogItem({title, date, description, image, id}: BlogItemProps){
  const wordCount = countWords(description);
  const avgTime = readTime(wordCount);

  return (
    <Link href={`/blog/${id}`}>
      <a
        title={`${title} - Click to Read More`}
        className={`cardItem flex ${styles.projectWrap}`}
      >
        <img
          className={styles.image}
          alt={`${title} Cover`}
          src={image}
        />
        <div className={styles.details}>
          <ReactMarkdown 
            className={styles.description}
            disallowedElements={["img"]}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {description}
          </ReactMarkdown>
          <hr/>
          <span>
            {date} 🗓️ | {wordCount} Words 📄 | {avgTime}
          </span>
        </div>
      </a>
    </Link>
  );
}