import styles from "../styles/components/SocialItem.module.scss";

import Link from "next/link";

interface SocialItemProps{
  icon: string,
  title?: string,
  label?: string,
  href: string,
  newPage?: boolean
}

export default function SocialItem({ icon, title, label, href, newPage = true }: SocialItemProps) {
  return (
    <li className={`cardItem ${styles.social}`}>
      <Link href={href}>
        <a aria-label={label} target={newPage ? "_blank" : "_self"} title={title} rel="noreferrer">
          <i className={icon} />
          {title ? <span>{title}</span> : <></>}
        </a>
      </Link>
    </li>
  );
}   