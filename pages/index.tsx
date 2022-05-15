import styles from "../styles/Home.module.scss";

import CardPanel from "../components/cardPanel";
import PageBase from "../components/pageBase";
import Project from "../components/project";
import SkillBar from "../components/skillBar";
import SocialItem from "../components/socialItem";
import Subtitle from "../components/subtitle";
import skillset from "../skillset.json";


interface HomeProps {
  projects: any[]
  drawings: any[]
}

export async function getStaticProps() {
  const res = await fetch("https://gist.githubusercontent.com/thejayduck/274ef60be752e3bcd3dc677dc3423933/raw");
  const data = await res.json();

  return {
    props: {
      projects: data.projects,
      drawings: data.drawings,
    },
    revalidate: 10
  };
}

export default function Home({ projects, drawings }: HomeProps) {
  return (
    <PageBase>
      <section className={`${styles.introductionWrap} flex`}>
        <div className={`flex flexColumn ${styles.profile}`}>
          <img alt="Profile Picture" src="/profileAlt.jpg" width={256} />
          <ul>
            <SocialItem icon="bx bxl-github" label="github" title="Github" href="https://github.com/thejayduck" />
            <SocialItem icon="bx bxl-gmail" label="gmail" title="Gmail" href="mailto:ardafevzi.armutcu@gmail.com" />
            <SocialItem icon="bx bxs-store" label="itch.io" title="Itch.io" href="https://thejayduck.itch.io/" />
            <SocialItem icon="bx bxl-twitter" label="twitter" title="Twitter" href="https://twitter.com/thejayduck" />
            <SocialItem icon="bx bxl-instagram-alt" label="instagram" title="Instagram" href="https://www.instagram.com/ardafevzi.armutcu/" />
          </ul>
          <ul className={styles.quickLinks}>
            <SocialItem icon="bx bxs-home" label="home" newPage={false} href="#home" />
            <SocialItem icon="bx bxs-wrench" label="skills" newPage={false} href="#skills" />
            <SocialItem icon="bx bx-laptop" label="projects" newPage={false} href="#projects" />
            <SocialItem icon="bx bxs-brush" label="drawings" newPage={false} href="#drawings" />
          </ul>
        </div>
        <div className={`${styles.details}`}>
          <CardPanel
            id="home"
            title={
              <>
                Hi there
                <span className={styles.wave}>👋🏻</span>!
                <br />
                I&apos;m <span>Arda Fevzi Armutcu</span>
              </>
            }
          >
            <Subtitle text="About Me" />
            <p>
              I am a 2nd year <span>English Language and Literature</span> student in Turkey. It might feel odd that a literature student has an enormous hobby like programming.
              Although programming is just a hobby for me, I have always been passionate working on new projects.
            </p>
          </CardPanel>
          <CardPanel id="skills" title="Skill Set 🔧">
            <Subtitle text="Hobbies" icon="bx bx-hive" />
            <div className={`${styles.skills} flex`}>
              {skillset.hobbies.map(q =>
                <SkillBar key={q.title} title={q.title} icon={q.icon} />
              )}
            </div>
            <hr />
            <Subtitle text="Languages" icon="bx bx-code-alt" />
            <div className={`${styles.skills} flex`}>
              {skillset.languages.map(q =>
                <SkillBar key={q.title} title={q.title} icon={q.icon} href={q.href} />
              )}
            </div>
            <hr/>
            <Subtitle text="Software" icon="bx bx-terminal" />
            <div className={`${styles.skills} flex`}>
              {skillset.software.map(q =>
                <SkillBar key={q.title} title={q.title} icon={q.icon} href={q.href} />
              )}
            </div>
            <hr/>
            <Subtitle text="Databases" icon="bx bx-data" />
            <div className={`${styles.skills} flex`}>
              {skillset.database.map(q =>
                <SkillBar key={q.title} title={q.title} icon={q.icon} href={q.href} />
              )}
            </div>
            <hr/>
            <Subtitle text="Others" icon="bx bx-box" />
            <div className={`${styles.skills} flex`}>
              {skillset.other.map(q =>
                <SkillBar key={q.title} title={q.title} icon={q.icon} href={q.href} />
              )}
            </div>
          </CardPanel>
          <CardPanel id="projects" title="Recent Projects 💻">
            <div className={`flex ${styles.works}`}>
              {
                projects.map(q => <Project key={q.title} data={q} details={true} />)
              }
            </div>
          </CardPanel>
          <CardPanel id="drawings" title="Recent Drawings 🖌️">
            <div className={`flex ${styles.works}`}>
              {
                drawings.map(q => <Project smaller={true} key={q.title} data={q} details={false} />)
              }
            </div>
          </CardPanel>
        </div>
      </section>
    </PageBase>
  );
}