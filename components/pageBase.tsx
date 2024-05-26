import styles from "../styles/PageBase.module.scss";

import useStreamData from "../lib/useStreamData";

import StreamNotification from "./streamNotification";

export default function PageBase({ children }: { children: React.ReactNode }) {
  const [streamData] = useStreamData();

  return (
    <main className={styles.container}>
      <StreamNotification {...streamData} />
      {children}
    </main>
  );
}
