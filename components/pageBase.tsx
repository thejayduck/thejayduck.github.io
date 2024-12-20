import styles from "../styles/PageBase.module.scss";

export default function PageBase({ children }: { children: React.ReactNode }) {
  return <main className={styles.container}>{children}</main>;
}
