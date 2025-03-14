import styles from "../styles/components/ToastNotification.module.scss";

import { motion } from "framer-motion";

export default function ToastNotifaction({
  title,
  summary,
  icon = "ri-notification-3-fill",
  urgency = "normal",
}: {
  title: string;
  summary: string;
  icon?: string;
  urgency?: "low" | "normal" | "critical";
}) {
  return (
    <motion.div
      className={`${styles.toast} ${styles[urgency]}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.2 }}
      layout
    >
      <div className={styles.progressBar}>
        <div className={styles.progress} />
      </div>
      <h4>
        <i className={icon} />
        <span>{title}</span>
      </h4>
      <p>{summary}</p>
    </motion.div>
  );
}
