import styles from "../styles/components/SocialItem.module.scss";

interface SocialItemProps{
    icon: string,
    title: string,
    href: string
}

export default function SocialItem({ icon, title, href }: SocialItemProps) {
  return (
    <li className={`cardItem ${styles.social}`}>
      <a aria-label={title} target="_blank" title={title} href={href} rel="noreferrer">
        <i className={icon} />
        <span>{title}</span>
      </a>
    </li>
  );
}   