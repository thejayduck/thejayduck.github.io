import styles from "../styles/components/ToastNotification.module.scss";

export default function ToastNotifaction({
  title,
  summary,
  icon = "bx bxs-bell",
  urgency = "normal",
}: {
  title: string;
  summary: string;
  icon?: string;
  urgency?: "low" | "normal" | "critical";
}) {
  return (
    <div className={`${styles.toast} ${styles[urgency]}`}>
      <div className={styles.progressBar}>
        <div className={styles.progress} />
      </div>
      <h4>
        <i className={icon} />
        <span>{title}</span>
      </h4>
      <p>{summary}</p>
    </div>
  );
}
