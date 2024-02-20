import styles from "../styles/Home.module.scss";

import Head from "next/head";
import Link from "next/link";

import CardPanel from "../components/cardPanel";
import ProfileWrap from "../components/home/profileWrap";
import SkillsWrap from "../components/home/skillsWrap";
import PageBase from "../components/pageBase";
import ProjectPanel from "../components/projects/projectPanel";
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
                I am a student in <span>University of Bremen</span>, studying
                linguistics and computer science. I am committed to learn new
                skills, and try out new stuff whenever I have the time to do so.
                Anyways, don&apos;t forget to check my{" "}
                <span>
                  <Link href="/blog">Blog Page</Link>
                </span>{" "}
                and{" "}
                <span>
                  <Link href="/gallery">Gallery</Link>
                </span>{" "}
                for more content!
              </p>
            </CardPanel>

            <SkillsWrap />

            <CardPanel title="Projects 💻">
              <div className={`${styles.projects}`}>
                <ProjectPanel />
              </div>
            </CardPanel>
          </section>
        </div>
      </PageBase>
    </>
  );
}
