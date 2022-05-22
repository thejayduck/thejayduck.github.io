import styles from "../styles/components/SocialItem.module.scss";

import Link from "next/link";

interface SocialItemProps{
  icon: string,
  title?: string,
  label?: string,
  href: string,
  onClick?: () => void;
  newPage?: boolean
}

export default function SocialItem({ icon, title, label, href, onClick, newPage = true }: SocialItemProps) {
  return (
    <li className={`cardItem ${styles.social}`}>
      <Link href={href}>
        <a onClick={onClick} aria-label={label} target={newPage ? "_blank" : "_self"} title={title} rel="noreferrer">
          <i className={icon} />
          {title ? <span>{title}</span> : <></>}
        </a>
      </Link>
    </li>
  );
}   