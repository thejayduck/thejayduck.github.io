import { useEffect, useState } from "react";
import styles from "@/styles/components/KaomojiLoader.module.scss";

const KAOMOJI = [
  "(＾▽＾)",
  "(￣▽￣)",
  "(・_・;)",
  "(•̀﹏•́)",
  "(˶•𐃷•˶)",
  "(╥﹏╥)",
  "(>_<)",
  "(◕‿◕)",
  "(•‿•)",
  "(。_。)",
  "(◠‿◠✿)",
  '(¬_¬")',
  "(˶ˆᗜˆ˵)",
];

export default function KaomojiLoader() {
  const [face, setFace] = useState<string>("(＾▽＾)");

  useEffect(() => {
    setFace(KAOMOJI[Math.floor(Math.random() * KAOMOJI.length)]);

    const interval = setInterval(() => {
      const random = KAOMOJI[Math.floor(Math.random() * KAOMOJI.length)];
      setFace(random);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.kaomojiWrapper}>
      <div className={styles.kaomoji}>{face}</div>
      <p>Loading Database…</p>
    </div>
  );
}
