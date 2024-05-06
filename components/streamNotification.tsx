import styles from "../styles/components/StreamNotification.module.scss";

import Link from "next/link";

import IStreamItem from "./home/IStreamItem";

export default function StreamNotification(stream: IStreamItem) {
  // const [collapsed, setCollapsed] = useState(false);
  return (
    <div className={styles.streamNotification}>
      <Link href="https://livestream.ardarmutcu.com" passHref>
        ⏺ Live Now: <span>{stream.stream_title}</span> - Click on banner to join
        the stream!
      </Link>
    </div>
    // TODO Disabled until I find a better way to handle thumbnail preview
    //? or maybe just remove it
    // <motion.div className={styles.streamNotification}>
    //   <div className={styles.notificationHeader}>
    //     <Link href="https://livestream.ardarmutcu.com" passHref>
    //       ⏺ Live Now: <span>{stream.stream_title}</span> - Click here to join
    //       the stream!
    //     </Link>
    //     <motion.i
    //       animate={{ rotate: collapsed ? 180 : 0 }}
    //       className="bx bxs-down-arrow"
    //       onClick={() => setCollapsed(!collapsed)}
    //     ></motion.i>
    //   </div>
    //   <AnimatePresence>
    //     {collapsed && (
    //       <motion.div
    //         initial={{ height: 0 }}
    //         animate={{ height: "auto" }}
    //         exit={{ height: 0 }}
    //         transition={{ duration: 0.3 }}
    //       >
    //         <Image
    //           src="https://livestream.ardarmutcu.com/thumbnail.jpg"
    //           width={1280}
    //           height={720}
    //           quality={65}
    //           alt="Stream Thumbnail"
    //         />
    //       </motion.div>
    //     )}
    //   </AnimatePresence>
    // </motion.div>
  );
}
