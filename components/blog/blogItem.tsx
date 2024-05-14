import styles from "../../styles/components/BlogItem.module.scss";

import Image from "next/image";
import Link from "next/link";

import React from "react";

import { countWords, readTime } from "../../lib/helper";

interface BlogProps {
  id: string;
  title: string;
  date: string;
  content: string;
  image: string;
  summary: string;
  tags: string[];
}

export default function BlogItem({
  id,
  title,
  date,
  content,
  summary,
  image,
  tags,
}: BlogProps) {
  const wordCount = countWords(content);
  const avgTime = readTime(wordCount);

  return (
    <li className={`cardItem ${styles.blogItem}`}>
      <div className={styles.imageContainer}>
        <Image
          src={image}
          alt={""}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className={styles.postContainer}>
        <article>
          <Link href={`/blog/${id}`} passHref>
            <h2>{title}</h2>
          </Link>
          <div className={styles.tags}>
            {tags.map((tag, index) => (
              <span key={index} className={styles.tag}>
                {tag}
                {index !== tags.length - 1 && ","}
              </span>
            ))}
          </div>
          <p>{summary}</p>
          <Link href={`/blog/${id}`} passHref>
            <p className={styles.readMore} title={`${title} - Read More`}>
              Read More ►
            </p>
          </Link>
          <hr />
          <span className={styles.stats}>
            {date} | {wordCount} Words | ~{avgTime} Minutes
          </span>
        </article>
      </div>
    </li>
  );
}
