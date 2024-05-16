import styles from "../styles/Home.module.scss";

import Head from "next/head";
import Link from "next/link";

import { useEffect, useState } from "react";

import CardPanel from "../components/cardPanel";
import IStreamItem from "../components/home/IStreamItem";
import ProfileWrap from "../components/home/profileWrap";
import SkillsWrap from "../components/home/skillsWrap";
import PageBase from "../components/pageBase";
import StreamNotification from "../components/streamNotification";
import Subtitle from "../components/subtitle";

export default function Home() {
  const [streamData, setStreamData] = useState<IStreamItem | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/fetchStreamData");
      const data = await response.json();
      setStreamData(data);
    };

    fetchData();
  }, []);
  return (
    <>
      <Head>
        <title>Arda Fevzi Armutcu</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Arda Fevzi Armutcu's Portfolio" />
      </Head>

      <PageBase>
        <StreamNotification {...streamData} />
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
