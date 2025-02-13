import styles from "../styles/Links.module.scss";

import Head from "next/head";
import Image from "next/image";

import Button from "../components/button";
import CardPanel from "../components/cardPanel";
import { placeholderImage } from "../components/imageShimmer";
import PageBase from "../components/pageBase";

export default function Links() {
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
            <h1>Find Me On</h1>
          </div>
          <ul className={`${styles.linkList}`}>
            <Button // linkedin
              icon="bx bxl-linkedin-square"
              label="linkedin"
              title="LinkedIn"
              href="https://linkedin.com/in/armutcu"
              newPage={true}
            />
            <Button // github
              icon="bx bxl-github"
              label="github"
              title="Github"
              href="https://github.com/thejayduck/"
              newPage={true}
            />
            <Button // itchio
              icon="bx bxs-store"
              label="itchio"
              title="Itch.io"
              href="https://thejayduck.itch.io/"
              newPage={true}
            />
            <Button // deviantart
              icon="bx bxl-deviantart"
              label="deviantart"
              title="DeviantArt"
              href="https://www.deviantart.com/thejayduck"
              newPage={true}
            />
            <Button // cara
              icon="bx bxs-copyright"
              label="cara"
              title="Cara"
              href="https://cara.app/thejayduck"
              newPage={true}
            />
            <Button // instagram
              icon="bx bxl-instagram-alt"
              label="instagram"
              title="Instagram"
              href="https://www.instagram.com/ardafevzi.armutcu/"
              newPage={true}
            />
          </ul>
          <span>This page is work in progress!</span>
        </section>
      </PageBase>
    </>
  );
}
