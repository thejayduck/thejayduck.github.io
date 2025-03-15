import styles from "../../styles/Home.module.scss";

import Image from "next/image";
import Link from "next/link";

import { getIcon } from "../../lib/helper";
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
        quality={75}
      />
      <div className={styles.navigation}>
        <ul className={`${styles.pageList}`}>
          <Button // blog
            icon={getIcon("blog")}
            label="blog"
            title="Blog"
            href="/blog"
            newPage={false}
          />
          <Button // projects
            icon={getIcon("projects")}
            label="projects"
            title="Projects"
            href="/projects"
            newPage={false}
          />
          <Button // gallery
            icon={getIcon("gallery")}
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
            <i className={getIcon("github")} />
          </Link>
          <Link // itch.io
            href="https://thejayduck.itch.io/"
            passHref
            aria-label="itch.io"
            title="itch.io"
          >
            <i className={getIcon("itchio")} />
          </Link>
          <Link // gmail
            href="mailto:portfolio.remember014@slmail.me"
            passHref
            aria-label="gmail (alias)"
            title="gmail (alias)"
          >
            <i className={getIcon("mail")} />
          </Link>
          <Link // links
            href="/links"
            passHref
            aria-label="social links"
            title="social links"
          >
            <i className={getIcon("dots")} />
          </Link>
        </ul>
      </div>
    </section>
  );
}
