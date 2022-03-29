import styles from "../styles/components/SocialItem.module.scss";

interface SocialItemProps{
    icon: string,
    title?: string,
    href: string,
    newPage?: boolean
}

export default function SocialItem({ icon, title, href, newPage = true }: SocialItemProps) {
  return (
    <li className={`cardItem ${styles.social}`}>
      <a aria-label={title} target={newPage ? "_blank" : "_self"} title={title} href={href} rel="noreferrer">
        <i className={icon} />
        {title ? <span>{title}</span> : <></>}
      </a>
    </li>
  );
}   