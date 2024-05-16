import styles from "../../styles/components/BlogItem.module.scss";

import Image from "next/image";
import Link from "next/link";

import React from "react";

import { countWords, readTime } from "../../lib/helper";

import IBlogProps from "./IBlogProps";

export default function BlogItem(blog: IBlogProps) {
  const wordCount = countWords(blog.content);
  const avgTime = readTime(wordCount);

  return (
    <li className={`cardItem ${styles.blogItem}`}>
      <div className={styles.imageContainer}>
        <Image
          src={blog.image}
          alt={""}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className={styles.postContainer}>
        <article>
          <Link href={`/blog/${blog.slug}`} passHref>
            <h2>{blog.title}</h2>
          </Link>
          <div className={styles.tags}>
            {blog.tags.map((tag: string, index: number) => (
              <span key={index} className={tag}>
                {tag}
                {index !== blog.tags.length - 1 && ","}
              </span>
            ))}
          </div>
          <p>{blog.summary}</p>
          <Link href={`/blog/${blog.slug}`} passHref>
            <p className={styles.readMore} title={`${blog.title} - Read More`}>
              Read More ►
            </p>
          </Link>
          <hr />
          <span className={styles.stats}>
            {blog.date} | {wordCount} Words | ~{avgTime} Minutes
          </span>
        </article>
      </div>
    </li>
  );
}
