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
  str = str.replace(/(^\s*)|(\s*$)/gi, "");
  str = str.replace(/[ ]{2,}/gi, "");
  str = str.replace(/\n /, "\n");

  return str.split(" ").length;
}

function ReadTime (input: number): number {
  const wpm = 200;

  return Math.ceil(input / wpm);
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
          <span>
            {date} 🗓️
            <br/>
            {wordCount} Words 📄 - {readTime} Minutes ⏱️
          </span>
          <div className={styles.description}>
            <ReactMarkdown disallowedElements={["img"]} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {description}
            </ReactMarkdown>
          </div>
        </div>
      </a>
    </Link>
  );
}