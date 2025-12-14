import styles from "@/styles/components/BlogItem.module.scss";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

import React from "react";

import { countWords, getIcon, readTime } from "@/lib/helper";
import { useToast } from "../ui/toashHandler";

import IBlogProps from "./IBlogProps";

export default function BlogItem(blog: IBlogProps) {
  const { showToast } = useToast();

  const wordCount = countWords(blog.content);
  const avgTime = readTime(wordCount);

  return (
    <motion.li
      className={`cardItem ${styles.blogItem}`}
      // Animation
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
      whileHover={{ scale: 1.02 }}
      transition={{
        opacity: { duration: 0.4 },
        scale: { duration: 0.02, type: "tween" },
      }}
    >
      <div className={styles.imageContainer}>
        <Image
          src={blog.image}
          alt={"Blog Post Accent Image"}
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
          <p className={styles.summary}>{blog.summary}</p>
          <div className={styles.buttons}>
            <Link // read more button
              href={`/blog/${blog.slug}`}
              passHref
              className={`${styles.button} ${styles.readmore}`}
            >
              <p title={`Click to read more about ${blog.title}`}>
                Click to Read More <i className={getIcon("rightArrow")} />
              </p>
            </Link>
            <a // copy link button
              className={`${styles.button} ${styles.copylink}`}
              onClick={(e) => {
                navigator.clipboard.writeText(
                  `${window.location.href}/${blog.slug}`
                );
                showToast(
                  "Post Link Copied!",
                  "The post link has been copied to your clipboard.",
                  getIcon("link")
                );
              }}
            >
              <p title={`Click copy link to ${blog.title} blog post.`}>
                <i className={`${getIcon("link")} ri-fw`} />
              </p>
            </a>
          </div>
          <hr />
          <span className={styles.stats}>
            {blog.date} | {wordCount} Words | ~{avgTime} Minutes
          </span>
        </article>
      </div>
    </motion.li>
  );
}
