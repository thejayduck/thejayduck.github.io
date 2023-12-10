import styles from "../styles/components/BlogItem.module.scss";

import Link from "next/link";
import { motion } from "framer-motion";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import React from "react";
import ReactMarkdown from "react-markdown";

import { countWords, readTime, truncate } from "../lib/helper";

interface BlogItemProps {
  title: string;
  date: string;
  content: string;
  image?: string;
  id: string;
}

export default function BlogItem({
  title,
  date,
  content,
  image,
  id,
}: BlogItemProps) {
  const wordCount = countWords(content);
  const avgTime = readTime(wordCount);
  const truncatedDesc = `${truncate(
    content,
    200
  )} <p style="color:var(--accent)"> **Click to Read More** ►</p>`;

  return (
    <Link href={`/blog/${id}`} passHref legacyBehavior>
      <motion.div
        layoutId={id}
        initial={false}
        transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
        className={`cardItem ${styles.projectWrap}`}
        title={`${title} - Click to Read More`}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          layout
          transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
          className={`flex flexColumn flexWrap ${styles.project}`}
        >
          <img
            className={styles.image}
            alt={`${title} Cover`}
            src={image || "/default.png"}
          />
          <div className={styles.details}>
            <ReactMarkdown
              className={styles.description}
              disallowedElements={["img"]}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {truncatedDesc}
            </ReactMarkdown>
            <hr />
            <span>
              {date} 🗓️ | {wordCount} Words 📄 | ~{avgTime} Minutes ⏱️
            </span>
          </div>
        </motion.div>
      </motion.div>
    </Link>
  );
}
