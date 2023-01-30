import styles from "../styles/Home.module.scss";

import Head from "next/head";

import CardPanel from "../components/cardPanel";
import ProfileWrap from "../components/home/profileWrap";
import SkillsWrap from "../components/home/skillsWrap";
import PageBase from "../components/pageBase";
import ProjectCell from "../components/projectCell";
import Subtitle from "../components/subtitle";
import projects from "../docs/json/projects.json";

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
                I am a... former 3rd year <span>English Language and Literature</span> student in Turkey.
                I am committed to learn new skills, and try out new stuff whenever I have the time to do so.
                Hence the reason this website is about everything except my university major 😅.
                Anyways, don&apos;t forget to check my <span><a href="#blog">Blog Page</a></span> and <span><a href="#gallery">Gallery</a></span> for more content!
              </p>
            </CardPanel>

            <SkillsWrap />

            <CardPanel title="Recent Projects 💻">
              <div className={`${styles.projects} grid`}>
                {
                  projects.data.map(q => <ProjectCell key={q.title} data={q} />)
                }
              </div>
            </CardPanel>
          </section>
        </div>
      </PageBase>
    </>
  );
}