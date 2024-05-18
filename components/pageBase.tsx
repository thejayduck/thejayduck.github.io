import styles from "../styles/PageBase.module.scss";

import { useEffect, useState } from "react";

import IStreamItem from "./home/IStreamItem";
import StreamNotification from "./streamNotification";

export default function PageBase({ children }: { children: React.ReactNode }) {
  const [streamData, setStreamData] = useState<IStreamItem | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/fetchStreamData");
      const data = await response.json();
      setStreamData(data);
    };

    fetchData();
  }, []);

  return (
    <main className={styles.container}>
      <StreamNotification {...streamData} />
      {children}
    </main>
  );
}
