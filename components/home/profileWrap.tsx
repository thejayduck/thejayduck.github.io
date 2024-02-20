import styles from "../../styles/Home.module.scss";

import Image from "next/image";
import Link from "next/link";

import Button from "../button";

// TODO remake & improve mobile compatibility

export default function ProfileWrap() {
  return (
    <section className={`${styles.profileWrap}`}>
      <Image
        className={styles.picture}
        alt="Profile Picture"
        src="/profileAlt.jpg"
        width={256}
        height={446}
        quality={85}
      />
      <div className={styles.navigation}>
        <ul className={`${styles.pageList}`}>
          <Button // blog
            icon="bx bxs-box"
            label="blog"
            title="Blog"
            href="/blog"
            newPage={false}
          />
          <Button // gallery
            icon="bx bxs-image"
            label="gallery"
            title="Gallery"
            href="/gallery"
            newPage={false}
          />
        </ul>
        <ul className={`cardItem ${styles.externalLinks}`}>
          <Link // github
            href="https://github.com/thejayduck"
            passHref
            aria-label="github"
            title="github"
          >
            <i className="bx bxl-github" />
          </Link>
          <Link // itch.io
            href="https://thejayduck.itch.io/"
            passHref
            aria-label="itch.io"
            title="itch.io"
          >
            <i className="bx bxs-store" />
          </Link>
          <Link // deviantart
            href="https://www.deviantart.com/thejayduck/"
            passHref
            aria-label="deviantart"
            title="deviantart"
          >
            <i className="bx bxl-deviantart" />
          </Link>
          <Link // instagram
            href="https://www.instagram.com/ardafevzi.armutcu/"
            passHref
            aria-label="instagram"
            title="instagram"
          >
            <i className="bx bxl-instagram-alt" />
          </Link>
          <Link // gmail
            href="mailto:portfolio.remember014@slmail.me"
            passHref
            aria-label="gmail (alias)"
            title="gmail (alias)"
          >
            <i className="bx bxl-gmail" />
          </Link>
        </ul>
      </div>
    </section>
  );
}
