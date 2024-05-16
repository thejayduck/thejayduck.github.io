// @ts-nocheck
import styles from "../styles/PageBase.module.scss";

import { useEffect, useState } from "react";

import IStreamItem from "./home/IStreamItem";
import ScrollManager from "./scrollManager";
import StreamNotification from "./streamNotification";

export default function PageBase({ children }) {
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
      <ScrollManager />
      {children}
    </main>
  );
}
