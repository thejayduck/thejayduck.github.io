import styles from "../styles/Links.module.scss";

import Head from "next/head";
import Image from "next/image";

import Button from "../components/button";
import { placeholderImage } from "../components/imageShimmer";
import PageBase from "../components/pageBase";
import { useToast } from "../components/toashHandler";

interface SocialLink {
  icon: string;
  label: string;
  title: string;
  href: string;
}

const socialLinks: SocialLink[] = [
  {
    icon: "ri-linkedin-box-fill",
    label: "linkedin",
    title: "LinkedIn",
    href: "https://linkedin.com/in/armutcu",
  },
  {
    icon: "ri-github-fill",
    label: "github",
    title: "Github",
    href: "https://github.com/thejayduck/",
  },
  {
    icon: "ri-store-2-fill",
    label: "itchio",
    title: "Itch.io",
    href: "https://thejayduck.itch.io/",
  },
  {
    icon: "ri-copyright-fill",
    label: "cara",
    title: "Cara",
    href: "https://cara.app/thejayduck",
  },
  {
    icon: "ri-image-fill",
    label: "deviantart",
    title: "DeviantArt",
    href: "https://www.deviantart.com/thejayduck",
  },
  {
    icon: "ri-instagram-fill",
    label: "instagram",
    title: "Instagram",
    href: "https://www.instagram.com/ardafevzi.armutcu/",
  },
];

export default function Links() {
  const { showToast } = useToast();

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
              quality={85}
            />
            <h1>
              <i className="ri-at-line" />
              thejayduck
            </h1>
          </div>
          <ul className={`${styles.linkList}`}>
            <li>
              <Button
                icon="ri-link"
                label="copy"
                title="Copy Link to Page"
                newPage={false}
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  showToast(
                    "Page Link Copied!",
                    "The page link has been copied to your clipboard.",
                    "ri-link"
                  );
                }}
              />
            </li>
            <hr />
            {socialLinks.map((link) => (
              <li key={link.label} className={styles.highlight}>
                <Button
                  icon={link.icon}
                  label={link.label}
                  title={link.title}
                  href={link.href}
                  newPage={true}
                />
                <Button
                  icon="ri-link"
                  label={`Copy link to ${link.label}`}
                  onClick={() => {
                    navigator.clipboard.writeText(link.href);
                    showToast(
                      "Link Copied!",
                      `The link to "${link.title}" has been copied to your clipboard.`,
                      "ri-link"
                    );
                  }}
                  newPage={false}
                />
              </li>
            ))}
            <h3>Homepage Redirects</h3>

            <li className={styles.highlight}>
              <Button // blog
                icon="ri-news-fill"
                label="blog"
                title="Blog"
                href="/blog"
                newPage={false}
              />
            </li>
            <li className={styles.highlight}>
              <Button // projects
                icon="ri-lightbulb-fill"
                label="projects"
                title="Projects"
                href="/projects"
                newPage={false}
              />
            </li>
            <li className={styles.highlight}>
              <Button // gallery
                icon="ri-gallery-fill"
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
