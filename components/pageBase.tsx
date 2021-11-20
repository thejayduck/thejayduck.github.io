// @ts-nocheck
import styles from "../styles/PageBase.module.scss";

export default function PageBase({ children }) {
  return (
      <main className={styles.container}>
        {children}
      </main>
  );
}