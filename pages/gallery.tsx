import styles from "../styles/Gallery.module.scss";

import Head from "next/head";
import { AnimateSharedLayout, motion } from "framer-motion";

import React, { useEffect, useState } from "react";

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
  const [images, setImages] : any[] = useState([]);
  const [targetImage, setTargetImage] = useState(null);
  const [filter, setFilter] = useState("");

  const imagePreviewState = (target: any) => {
    setTargetImage(target);
  };

  useEffect(() => {
    setImages(!filter ? gallery : gallery.filter(e => e.tag == filter));
  }, [filter]);

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

            <label htmlFor="filter">Filter: </label>

            <select name="filter" id="filter" onChange={e => setFilter(e.target.value)}>
              <option value="">All</option>
              <option value="sketch">Sketches</option>
              <option value="color">Colored</option>
            </select>

            <AnimateSharedLayout>
              <motion.ul
                variants={list}
                initial={"initial"}
                animate={"animate"}
              >
                {images.map((q: any) => (
                  <motion.li
                    key={q.title}
                    layout
                    layoutId={`image-${q.title}`}
                    onClick={() => imagePreviewState(q)}
                    title="Expand Image"
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

              {targetImage && 
              <ImagePreviewComponent 
                imageData={targetImage} 
                onClickOutside={() => imagePreviewState(null)} 
              />}

            </AnimateSharedLayout>
          </CardPanel>
        </section>
      </PageBase>
    </>
  );
}