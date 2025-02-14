import styles from "../styles/components/Button.module.scss";

import Link from "next/link";

interface ButtonProps {
  icon: string;
  title?: string;
  label?: string;
  href?: string;
  onClick?: () => void;
  newPage?: boolean;
}

export default function Button({
  icon,
  title,
  label,
  href = "#",
  onClick,
  newPage = true,
}: ButtonProps) {
  return (
    // TODO make alternative button for stuff that won't redirect to a page
    <Link
      href={href}
      passHref
      onClick={onClick}
      aria-label={label}
      target={newPage ? "_blank" : "_self"}
      title={label}
      rel="noreferrer"
      id={label}
      className={`cardItem ${styles.button}`}
    >
      <i className={icon} />
      {title}
    </Link>
  );
}
