import styles from "@/styles/components/Skillbar.module.scss";

import { motion } from "motion/react";

interface SkillBarProps {
  title: string;
  icon: string;
  href?: string;
  target?: "_blank" | "_self";
}

export default function SkillBar({
  title,
  icon,
  href,
  target = "_blank",
}: SkillBarProps) {
  return (
    <motion.a
      className={`${styles.skillWrap} cardItem`}
      title={`${title}`}
      href={href}
      target={target}
      rel="noreferrer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.5 } }}
    >
      <i className={`${icon}`} />
      <span className={styles.title}>{title}</span>
    </motion.a>
  );
}
