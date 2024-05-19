import styles from "../styles/Home.module.scss";

import Head from "next/head";
import Link from "next/link";

import CardPanel from "../components/cardPanel";
import ProfileWrap from "../components/home/profileWrap";
import SkillsWrap from "../components/home/skillsWrap";
import PageBase from "../components/pageBase";
import Subtitle from "../components/subtitle";

export default function Home() {
  return (
    <>
      <Head>
        <title>Arda Fevzi Armutcu</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Arda Fevzi Armutcu's Portfolio" />
      </Head>

      <PageBase>
        <div className={`${styles.mainSection} flex`}>
          <ProfileWrap />

          <section className={`${styles.panelsWrap}`}>
            <CardPanel
              title={
                <>
                  Hi there
                  <span className={styles.wave}>👋🏻</span>!
                  <br />
                  I&apos;m <span>Arda Fevzi Armutcu</span>
                </>
              }
            >
              <Subtitle text="About Me" icon="bx bx-detail" />
              <p>
                I am a student at the <span>University of Bremen</span>,
                studying linguistics and computer science. I&apos;m always on
                the lookout for new skills to learn, from diving into a new
                programming language to honing my drawing skills. In my free
                time, I like to occupy myself with my projects and hobbies.
                Curious to see what I&apos;m working on? Check out my latest{" "}
                <span>
                  <Link href="/blog">Blog</Link>
                </span>
                , explore some of my drawings in the{" "}
                <span>
                  <Link href="/gallery">Gallery</Link>
                </span>
                , or take a look at my released{" "}
                <span>
                  <Link href="/projects">Projects</Link>
                </span>
                !
              </p>
            </CardPanel>

            <SkillsWrap />
          </section>
        </div>
      </PageBase>
    </>
  );
}
