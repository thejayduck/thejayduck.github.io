import styles from "../styles/components/Subtitle.module.scss";

interface SubtitleProps {
  text: string;
  icon?: string;
}

export default function Subtitle({ text, icon }: SubtitleProps) {
  return (
    <h2 className={styles.subtitle}>
      {text} <i className={`${icon}`} />
    </h2>
  );
}
