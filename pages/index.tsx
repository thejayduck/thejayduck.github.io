import styles from "../styles/Home.module.scss";

import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Link from "next/link";

import CardPanel from "../components/cardPanel";
import IStreamItem from "../components/home/IStreamItem";
import ProfileWrap from "../components/home/profileWrap";
import SkillsWrap from "../components/home/skillsWrap";
import PageBase from "../components/pageBase";
import StreamNotification from "../components/streamNotification";
import Subtitle from "../components/subtitle";

export const getStaticProps = (async (context) => {
  const res = await fetch("https://livestream.ardarmutcu.com/status.php");
  const streamStatus = await res.json();
  return { props: { streamStatus } };
}) satisfies GetStaticProps<{
  streamStatus: IStreamItem;
}>;

export default function Home({
  streamStatus,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Arda Fevzi Armutcu</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Arda Fevzi Armutcu's Portfolio" />
      </Head>

      <PageBase>
        {streamStatus.is_active && <StreamNotification {...streamStatus} />}
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
                  <Link href="/blog">Blog</Link>
                </span>
                ,{" "}
                <span>
                  <Link href="/gallery">Gallery</Link>
                </span>{" "}
                and{" "}
                <span>
                  <Link href="/projects">Projects</Link>
                </span>{" "}
                for more content!
              </p>
            </CardPanel>

            <SkillsWrap />
          </section>
        </div>
      </PageBase>
    </>
  );
}
