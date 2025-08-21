import styles from "../styles/Links.module.scss";

import Head from "next/head";
import Image from "next/image";

import Button from "../components/button";
import { placeholderImage } from "../components/imageShimmer";
import PageBase from "../components/pageBase";
import { useToast } from "../components/toashHandler";
import { getIcon } from "../lib/helper";

interface SocialLink {
  icon: string;
  label: string;
  title: string;
  href: string;
  old?: boolean;
}

const socialLinks: SocialLink[] = [
  {
    icon: getIcon("linkedin"),
    label: "linkedin",
    title: "LinkedIn",
    href: "https://linkedin.com/in/armutcu",
  },
  {
    icon: getIcon("opensource"),
    label: "codeberg",
    title: "Codeberg",
    href: "https://codeberg.org/TheJayDuck",
  },
  {
    icon: getIcon("itchio"),
    label: "itchio",
    title: "Itch.io",
    href: "https://thejayduck.itch.io/",
  },
  {
    icon: getIcon("cara"),
    label: "cara",
    title: "Cara",
    href: "https://cara.app/thejayduck",
  },
  {
    icon: getIcon("github"),
    label: "github",
    title: "Github",
    href: "https://github.com/thejayduck/",
    old: true,
  },
  {
    icon: getIcon("deviantart"),
    label: "deviantart",
    title: "DeviantArt",
    href: "https://www.deviantart.com/thejayduck",
    old: true,
  },
  // {
  //   icon: getIcon("instagram"),
  //   label: "instagram (inactive)",
  //   title: "Instagram (inactive)",
  //   href: "https://www.instagram.com/ardafevzi.armutcu/",
  // },
];

export default function Links() {
  const { showToast } = useToast();
  const linkMap = (links: SocialLink[]) =>
    links.map((link) => (
      <li key={link.label} className={styles.highlight}>
        <Button
          icon={link.icon}
          label={link.label}
          title={link.title}
          href={link.href}
          newPage={true}
        />
        <Button
          icon={getIcon("link")}
          label={`Copy link to ${link.label}`}
          onClick={() => {
            navigator.clipboard.writeText(link.href);
            showToast(
              "Link Copied!",
              `The link to "${link.title}" has been copied to your clipboard.`,
              getIcon("link")
            );
          }}
          newPage={false}
        />
      </li>
    ));

  return (
    <>
      <Head>
        <title>Links · Arda Fevzi Armutcu</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Arda Fevzi Armutcu's Links" />
        <meta
          property="og:image"
          content="https://ardarmutcu.com/api/og?title=portfolio"
        />
      </Head>

      <PageBase>
        <section className={`${styles.panelsWrap} cardItem`}>
          <div className={styles.header}>
            <Image
              className={styles.picture}
              alt="Profile Picture"
              src="https://utfs.io/a/hj5xs4m6pg/qeLXJUQ9GpPCSifPjnRJBnDwh9l4xkuN2T7qp3LbvZdHVfIi"
              priority
              placeholder={placeholderImage(96, 128)}
              width={96}
              height={128}
              quality={75}
            />
            <h1>
              <i className={getIcon("at")} />
              thejayduck
            </h1>
          </div>
          <ul className={`${styles.linkList}`}>
            <li>
              <Button
                icon={getIcon("link")}
                label="copy"
                title="Copy Link to Page"
                newPage={false}
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  showToast(
                    "Page Link Copied!",
                    "The page link has been copied to your clipboard.",
                    getIcon("link")
                  );
                }}
              />
            </li>
            <hr />
            {linkMap(socialLinks.filter((link) => !link.old))}

            <h3>Inactive Socials</h3>
            {linkMap(socialLinks.filter((link) => link.old))}

            <h3>Homepage Redirects</h3>

            <li className={styles.highlight}>
              <Button // blog
                icon={getIcon("blog")}
                label="blog"
                title="Blog"
                href="/blog"
                newPage={false}
              />
            </li>
            <li className={styles.highlight}>
              <Button // projects
                icon={getIcon("projects")}
                label="projects"
                title="Projects"
                href="/projects"
                newPage={false}
              />
            </li>
            <li className={styles.highlight}>
              <Button // gallery
                icon={getIcon("gallery")}
                label="gallery"
                title="Gallery"
                href="/gallery"
                newPage={false}
              />
            </li>
          </ul>
        </section>
      </PageBase>
    </>
  );
}
