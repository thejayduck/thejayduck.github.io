import styles from "../../styles/Home.module.scss";

import Image from "next/image";
import Link from "next/link";

import Button from "../button";
import { placeholderImage } from "../imageShimmer";

export default function ProfileWrap() {
  return (
    <section className={`${styles.profileWrap}`}>
      <Image
        className={styles.picture}
        alt="Profile Picture"
        src="https://utfs.io/a/hj5xs4m6pg/qeLXJUQ9GpPCSifPjnRJBnDwh9l4xkuN2T7qp3LbvZdHVfIi"
        priority
        placeholder={placeholderImage(256, 446)}
        width={256}
        height={446}
        quality={85}
      />
      <div className={styles.navigation}>
        <ul className={`${styles.pageList}`}>
          <Button // blog
            icon="ri-news-fill"
            label="blog"
            title="Blog"
            href="/blog"
            newPage={false}
          />
          <Button // projects
            icon="ri-lightbulb-fill"
            label="projects"
            title="Projects"
            href="/projects"
            newPage={false}
          />
          <Button // gallery
            icon="ri-gallery-fill"
            label="gallery"
            title="Gallery"
            href="/gallery"
            newPage={false}
          />
          {/* <Button // links
            icon="bx bx-link"
            label="links"
            title="Links"
            href="/links"
            newPage={false}
          /> */}
        </ul>
        <ul className={`cardItem ${styles.externalLinks}`}>
          <Link // github
            href="https://github.com/thejayduck"
            passHref
            aria-label="github"
            title="github"
          >
            <i className="ri-github-fill" />
          </Link>
          <Link // itch.io
            href="https://thejayduck.itch.io/"
            passHref
            aria-label="itch.io"
            title="itch.io"
          >
            <i className="ri-store-2-fill" />
          </Link>
          {/* <Link // deviantart
            href="https://www.deviantart.com/thejayduck/"
            passHref
            aria-label="deviantart"
            title="deviantart"
          >
            <i className="bx bxl-deviantart" />
          </Link> */}
          {/* <Link // instagram
            href="https://www.instagram.com/ardafevzi.armutcu/"
            passHref
            aria-label="instagram"
            title="instagram"
          >
            <i className="bx bxl-instagram-alt" />
          </Link> */}
          <Link // gmail
            href="mailto:portfolio.remember014@slmail.me"
            passHref
            aria-label="gmail (alias)"
            title="gmail (alias)"
          >
            <i className="ri-mail-fill" />
          </Link>
          <Link // links
            href="/links"
            passHref
            aria-label="social links"
            title="social links"
          >
            <i className="ri-more-fill" />
          </Link>
        </ul>
      </div>
    </section>
  );
}
