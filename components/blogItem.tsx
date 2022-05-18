import styles from "../styles/components/BlogItem.module.scss";

import Link from "next/link";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import React from "react";
import ReactMarkdown from "react-markdown";

interface BlogItemProps {
    title: string,
    date: string,
    description: string,
    image?: string
    id: string
}

function CountWords (str: string): number {
  str = str.replace(/\b(\w+)\/(\w+(?!#\d+))\b/, "\n");
  str = str.replace(/<[^>]*>/g, " ");
  str = str.trim();
  return str.split(" ").length;
}

function ReadTime (words: number): number {
  const wpm = 200;

  return Math.ceil(words / wpm);
}

export default function BlogItem({title, date, description, image, id}: BlogItemProps){
  const wordCount = CountWords(description);
  const readTime = ReadTime(wordCount);

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
          <div className={styles.description}>
            <ReactMarkdown disallowedElements={["img"]} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {description}
            </ReactMarkdown>
          </div>
          <hr/>
          <span>
            {date} 🗓️ - {wordCount} Words 📄 - {readTime} Minutes ⏱️
          </span>
        </div>
      </a>
    </Link>
  );
}