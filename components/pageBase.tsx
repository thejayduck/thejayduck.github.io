// @ts-nocheck
import styles from "../styles/PageBase.module.scss";

import ScrollManager from "./scrollManager";
// import StreamNotification from "./streamNotification";

export default function PageBase({ children }) {
  return (
    <main className={styles.container}>
      <ScrollManager />
      {/* <StreamNotification /> */}
      {children}
    </main>
  );
}
