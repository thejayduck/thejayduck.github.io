import styles from "../styles/PageBase.module.scss";

import useStreamData from "../lib/useStreamData";

export default function PageBase({ children }: { children: React.ReactNode }) {
  const [streamData] = useStreamData();

  return <main className={styles.container}>{children}</main>;
}
