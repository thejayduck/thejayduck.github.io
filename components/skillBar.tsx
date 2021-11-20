import styles from "../styles/components/Skillbar.module.scss";

import { motion } from "framer-motion";

interface SkillBarProps{
    title: string,
    icon: string,
}

export default function SkillBar({ title, icon }: SkillBarProps) {
  return (
    <motion.div
      className={`${styles.skillWrap} cardItem`}

      title={`${title}`}

      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.5 } }}
    >
      <div className={styles.icon}>
        <i
          className={`${icon}`}
        />
      </div>
      <div>
        <span className={styles.title}>{title}</span>
      </div>
    </motion.div>
  );
}