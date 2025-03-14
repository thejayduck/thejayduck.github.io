import styles from "../styles/components/StreamNotification.module.scss";

import Link from "next/link";
import { motion } from "framer-motion";

import IStreamItem from "./home/IStreamItem";

export default function StreamNotification(stream: IStreamItem) {
  return (
    stream.is_active && (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "55px", opacity: 1 }}
        transition={{
          height: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.4 },
        }}
        className={styles.streamNotification}
      >
        <i className="ri-video-on-fill" />
        <span>{stream.stream_title} Live!</span>
        <Link
          href="https://livestream.ardarmutcu.com"
          title="Click to join the stream."
          passHref
        >
          <p className={styles.redirect}>Join Stream!</p>
        </Link>
      </motion.div>
    )
  );
}
