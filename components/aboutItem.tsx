import styles from "../styles/components/AboutItem.module.scss";

interface AboutItemProps{
    description: string,
}

export default function AboutItem({ description }: AboutItemProps) {
  return (
    <li className={`${styles.about} cardItem`}>
      <i className="bx bxs-right-arrow" />
      <p>{description}</p>
    </li>
  );
}