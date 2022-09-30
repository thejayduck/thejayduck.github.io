import styles from "../styles/Gallery.module.scss";

import Head from "next/head";
import { AnimateSharedLayout, motion } from "framer-motion";

import React, { useState } from "react";

import CardPanel from "../components/cardPanel";
import { ImagePreviewComponent } from "../components/imagePreviewComponent";
import PageBase from "../components/pageBase";
import SocialItem from "../components/socialItem";
import gallery from "../docs/json/gallery.json";

const list = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  }
};

export default function Gallery () {
  const [targetImage, setTargetImage] = useState(null);

  const imagePreviewState = (target: any) => {
    setTargetImage(target);
  };

  return (
    <>
      <Head>
        <title>Gallery · Arda Fevzi Armutcu</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Arda Fevzi Armutcu's Gallery" />
      </Head>

      <PageBase>
        <ul className={`flex flexRight ${styles.backButton}`}>
          <SocialItem icon="bx bx-undo" label="back" title="Back to Homepage" href="/" newPage={false} />
        </ul>
        
        <section className={`${styles.mainSection} flex flexColumn`}>
          <CardPanel title={"Gallery 🖌️"}>
            <p>📮<b>{gallery.length}</b> Posts</p>
            <p>❗Here I post my sketches and finished drawings. All of the images down below are downscaled!</p>
            <hr/>

            <AnimateSharedLayout>
              <motion.ul
                variants={list}
                initial={"initial"}
                animate={"animate"}
              >
                {gallery.map((q, idx) => (
                  <motion.li
                    key={idx}
                    layout
                    layoutId={`image-${q.title}`}
                    onClick={() => imagePreviewState(q)}
                  >
                    <a target="_blank" rel="noreferrer">
                      <motion.img alt={`Drawing - ${q.title}`} src={q.image} />
                      <figcaption>
                        [{q.date}]
                        <br />
                        {q.title}
                      </figcaption>
                    </a>
                  </motion.li>
                )
                )}
                <li></li>
              </motion.ul>

              {targetImage && <ImagePreviewComponent imageData={targetImage} onClickOutside={() => imagePreviewState(null)} />}

            </AnimateSharedLayout>
          </CardPanel>
        </section>
      </PageBase>
    </>
  );
}

