import styles from "../styles/components/StreamNotification.module.scss";

import Link from "next/link";

import { useEffect, useState } from "react";

export default function StreamNotification() {
  const [streamStatus, setStreamStatus] = useState(false);
  const [streamTitle, setStreamTitle] = useState(null);

  useEffect(() => {
    const fetchStreamStatus = async () => {
      try {
        const response = await fetch(
          "https://livestream.ardarmutcu.com/status.php"
        );
        if (!response.ok) {
          throw new Error("Network responded with an error.");
        }
        const data = await response.json();

        setStreamStatus(data.is_active);
        setStreamTitle(data.stream_title);
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    };
    fetchStreamStatus();
  }, []);

  return (
    <>
      {streamStatus && (
        <div className={styles.streamNotification}>
          <Link href="https://livestream.ardarmutcu.com" passHref>
            <span>
              ⏺ Live Now: {streamTitle} - Click here to join the stream!
            </span>
          </Link>
        </div>
      )}
    </>
  );
}
