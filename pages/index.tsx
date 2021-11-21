import styles from "../styles/Home.module.scss";

import CardPanel from "../components/cardPanel";
import PageBase from "../components/pageBase";
import Project from "../components/project";
import SkillBar from "../components/skillBar";
import SocialItem from "../components/socialItem";
import Subtitle from "../components/subtitle";
import skillset from "../skillset.json";

interface HomeProps{
  data: any[]
}

export async function getStaticProps() {
  const res = await fetch("https://gist.githubusercontent.com/thejayduck/274ef60be752e3bcd3dc677dc3423933/raw");
  const data = await res.json();

  return {
    props: {
      data
    },
    revalidate: 10
  };
}

export default function Home({ data }: HomeProps) {
  return (
    <PageBase>
      <section className={`${styles.introductionWrap} flex`}>
        <div className={`flex flexColumn ${styles.profile}`}>
          <img src="profileLarge.png" width={256} />
          <ul>
            <SocialItem icon="bx bxl-github" title="Github" href="https://github.com/thejayduck" />
            <SocialItem icon="bx bxs-envelope" title="Email" href="mailto:ardafevzi.armutcu@gmail.com" />
            <SocialItem icon="bx bxs-shopping-bag" title="Itch.io" href="https://thejayduck.itch.io/" />
            <SocialItem icon="bx bxl-twitter" title="Twitter" href="https://twitter.com/thejayduck" />
            <SocialItem icon="bx bxl-instagram-alt" title="Instagram" href="https://www.instagram.com/ardafevzi.armutcu/" />

          </ul>
        </div>        
        <div className={`${styles.details}`}>
          <CardPanel 
            title={
              <>
                Hi there
                <span className={styles.wave}>👋🏻</span>!
                <br/>
                I&apos;m <span>Arda Fevzi Armutcu</span>
              </>
            }>
            <p>
                I am a 2nd year <span>English Language and Literature</span> student in Turkey. It might feel odd that a literature student has an enormous hobby like programming. 
                Although programming is just a hobby for me, I have always been passionate about creating my projects.
                Mostly because I have the freedom to create whatever I wish to.
            </p>
          </CardPanel>
          <CardPanel title="Skill Set 🔧">
            <Subtitle text="Languages"/>           
            <div className={`${styles.skills} flex`}>
              {skillset.skills.map(q =>
                <SkillBar key={q.title} title={q.title} icon={q.icon} href={q.href} />
              )}   
            </div>
            <Subtitle text="Tools"/>           
            <div className={`${styles.skills} flex`}>
              {skillset.tools.map(q =>
                <SkillBar key={q.title} title={q.title} icon={q.icon} href={q.href} />
              )}   
            </div>  
          </CardPanel>
          <CardPanel title="Recent Projects 💻">
            <div className={`flex ${styles.works}`}>
              {
                data.map(q => <Project key={q.title} data={q} />)
              }
            </div>
          </CardPanel>
        </div>
      </section>
    </PageBase>
  );
}

