import { getIcon, isMobile } from "@/lib/helper";
import styles from "@/styles/components/Footer.module.scss";
import Link from "next/link";
import { useEffect, useState } from "react";

interface RowElementProps {
  title: string;
  content: {
    label: string;
    icon?: string;
    link: string;
    external?: boolean;
  }[];
}

const footerRows: RowElementProps[] = [
  {
    title: "Redirects",
    content: [
      { label: "Home", link: "/", icon: "ri-home-2-fill" },
      { label: "Blog", link: "/blog", icon: getIcon("blog") },
      { label: "Projects", link: "/projects", icon: getIcon("projects") },
      { label: "Gallery", link: "/gallery", icon: getIcon("gallery") },
      { label: "Links", link: "/links", icon: getIcon("link") },
    ],
  },
  {
    title: "Socials",
    content: [
      {
        label: "Codeberg",
        icon: getIcon("opensource"),
        link: "https://codeberg.org/TheJayDuck/",
        external: true,
      },
      {
        label: "LinkedIn",
        icon: getIcon("linkedin"),
        link: "https://linkedin.com/in/armutcu",
        external: true,
      },
      {
        label: "Cara",
        icon: getIcon("cara"),
        link: "https://cara.app/thejayduck",
        external: true,
      },
    ],
  },
];

export default function Footer() {
  const [mobileClient, setMobileClient] = useState(false);

  useEffect(() => {
    setMobileClient(isMobile());
  }, []);

  const rowElement = ({ title, content }: RowElementProps) => {
    return (
      <div className={styles.rowWrapper}>
        <h3>{title}</h3>
        {content.map((item) => (
          <div key={item.label} className={styles.rowItem}>
            {item.icon && <i className={item.icon} />}
            <Link
              aria-label={`Link to ${item.label}`}
              title={`Link to ${item.label}`}
              href={item.link}
              target={item.external ? "_blank" : "_self"}
              rel={item.external ? "noopener noreferrer" : undefined}
            >
              {item.label}
            </Link>
          </div>
        ))}
      </div>
    );
  };

  return (
    <footer className={`${styles.footer} ${mobileClient ? styles.mobile : ""}`}>
      {/* {!mobileClient && (
        <div className={styles.blurb}>
          <h3>Arda Fevzi Armutcu</h3>
          <p>I do several things.</p>
        </div>
      )} */}
      {footerRows.map((row) => (
        <nav key={row.title} aria-label={row.title}>
          {rowElement(row)}
        </nav>
      ))}
    </footer>
  );
}
