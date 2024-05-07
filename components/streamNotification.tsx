import styles from "../styles/components/StreamNotification.module.scss";

import Link from "next/link";

import IStreamItem from "./home/IStreamItem";

export default function StreamNotification(stream: IStreamItem) {
  return (
    <div className={styles.streamNotification}>
      <i className="bx bxs-video-recording" />
      <span>{stream.stream_title} Live!</span>
      <Link
        href="https://livestream.ardarmutcu.com"
        title="Click to join the stream."
        passHref
      >
        <p className={styles.redirect}>Join Stream!</p>
      </Link>
    </div>
  );
}
