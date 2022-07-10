import styles from "../styles/Gallery.module.scss";

import Head from "next/head";
import { motion } from "framer-motion";

import PageBase from "../components/pageBase";
import SocialItem from "../components/socialItem";
import gallery from "../docs/json/gallery.json";

const list = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    }
  }
};

const imageElement = {
  initial: {
    opacity: 0,
    x: -50,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.85,
    }
  }
};

export default function Gallery () {
  return (
    <>
      <Head>
        <title>Gallery · Arda Fevzi Armutcu</title>
      </Head>

      <PageBase>
        <ul className={`flex flexRight ${styles.backButton}`}>
          <SocialItem icon="bx bx-undo" label="back" title="Back to Homepage" href="/" newPage={false} />
        </ul>
        
        <section className={`${styles.mainSection} cardItem`}>
          <motion.ul
            variants={list}
            initial={"initial"}
            animate={"animate"}
          >
            {gallery.data.map((q, idx) =>
              <motion.li 
                key={idx}
                variants={imageElement}
              >
                <a href={q.url ?? q.image} target="_blank" rel="noreferrer">
                  <img src={q.image} />
                  <figcaption>{q.title}</figcaption>
                </a>
              </motion.li>
            )}
            <li></li>
          </motion.ul>
        </section>
      </PageBase>
    </>
  );
}