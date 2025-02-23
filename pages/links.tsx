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
    icon: "bx bxl-linkedin-square",
    label: "linkedin",
    title: "LinkedIn",
    href: "https://linkedin.com/in/armutcu",
  },
  {
    icon: "bx bxl-github",
    label: "github",
    title: "Github",
    href: "https://github.com/thejayduck/",
  },
  {
    icon: "bx bxs-store",
    label: "itchio",
    title: "Itch.io",
    href: "https://thejayduck.itch.io/",
  },
  {
    icon: "bx bxs-copyright",
    label: "cara",
    title: "Cara",
    href: "https://cara.app/thejayduck",
  },
  {
    icon: "bx bxl-deviantart",
    label: "deviantart",
    title: "DeviantArt",
    href: "https://www.deviantart.com/thejayduck",
  },
  {
    icon: "bx bxl-instagram-alt",
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
            <h1>@thejayduck</h1>
          </div>
          <ul className={`${styles.linkList}`}>
            <li>
              <Button
                icon="bx bx-link"
                label="copy"
                title="Copy Link to Page"
                newPage={false}
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  showToast(
                    "Page Link Copied!",
                    "The page link has been copied to your clipboard."
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
                  icon="bx bx-link"
                  label={`Copy link to ${link.label}`}
                  onClick={() => {
                    navigator.clipboard.writeText(link.href);
                    showToast(
                      "Link Copied!",
                      `The link to "${link.title}" has been copied to your clipboard.`
                    );
                  }}
                  newPage={false}
                />
              </li>
            ))}
            <hr />
            <h3>Homepage Redirects</h3>

            <li>
              <Button // blog
                icon="bx bxs-box"
                label="blog"
                title="Blog"
                href="/blog"
                newPage={false}
              />
            </li>
            <li>
              <Button // projects
                icon="bx bxs-bulb"
                label="projects"
                title="Projects"
                href="/projects"
                newPage={false}
              />
            </li>
            <li>
              <Button // gallery
                icon="bx bxs-image"
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
