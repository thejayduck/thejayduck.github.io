// @ts-nocheck
import styles from "../styles/PageBase.module.scss";

import ScrollManager from "./scrollManager";

export default function PageBase({ children }) {  
  return (
    <main className={styles.container}>
      <ScrollManager/>
      {children}
    </main>
  );
}