import Head from 'next/head'
import Image from 'next/image'
import PageBase from '../components/pageBase'
import Project from '../components/project'
import SkillBar from '../components/skillBar'
import SocialItem from '../components/socialItem'
import Subtitle from '../components/subtitle'
import styles from '../styles/Home.module.scss'

interface HomeProps{
  data: any[]
}

const skills = [
  {
    title: "C#",
    icon: "devicon-csharp-plain",
  },
  {
    title: "Next.js",
    icon: "devicon-nextjs-plain",
  },
  {
    title: "MongoDB",
    icon: "devicon-mongodb-plain-wordmark",
  },
  {
    title: "JavaScript",
    icon: "devicon-javascript-plain",
  },
  {
    title: "PHP",
    icon: "devicon-php-plain",
  },
  {
    title: "HTML",
    icon: "devicon-html5-plain",
  },
  {
    title: "CSS",
    icon: "devicon-css3-plain",
  },
  {
    title: "SASS",
    icon: "devicon-sass-original",
  }
]

const tools = [
  {
    title: "Visual Studio Code",
    icon: "devicon-visualstudio-plain",
  },
  {
    title: "Unity Engine",
    icon: "devicon-unity-original",
  },
  {
    title: "Heroku",
    icon: "devicon-heroku-original",
  },
  {
    title: "Figma",
    icon: "devicon-figma-plain",
  }
]

export async function getStaticProps() {
  const res = await fetch('https://gist.githubusercontent.com/thejayduck/274ef60be752e3bcd3dc677dc3423933/raw')
  const data = await res.json();

  return {
    props: {
      data
    },
    revalidate: 10
  }
}

export default function Home({ data }: HomeProps) {
  return (
    <PageBase>
      <section className={`${styles.introductionWrap} flex`}>
        <div className={`flex flexColumn ${styles.profile}`}>
          <img src="profileLarge.png" width={256} />
          <ul>
            <SocialItem icon="bx bxl-github" title="Github" url="https://github.com/thejayduck" />
            <SocialItem icon="bx bxl-twitter" title="Twitter" url="https://github.com/thejayduck" />
            <SocialItem icon="bx bxs-envelope" title="Email" url="mailto:ardafevzi.armutcu@gmail.com" />
          </ul>
        </div>        
        <div className={`${styles.details}`}>
          <div className={`cardItem ${styles.about}`}>
            <div className={styles.introduction}>
              <h1>
                Hi there
                <span className={styles.wave}>👋🏻</span>!
                <br/>
                I'm <span>Arda Fevzi Armutcu</span>
              </h1>
              <p>
                I am a 2nd year <span>English Language and Literature</span> student in Turkey. It might feel odd that a literature student has an enormous hobby like programming. 
                Although programming is just a hobby for me, I have always been passionate about creating my projects.
                Mostly because I have the freedom to create whatever I wish to.
              </p>
            </div>
            <br/>
            <h1> Skill Set 🔧 </h1>
            <Subtitle text="Languages"/>           
            <div className={`${styles.skills} flex`}>
              {skills.map(q =>
                <SkillBar key={q.title} title={q.title} icon={q.icon} />
              )}   
            </div>
            <Subtitle text="Tools"/>           
            <div className={`${styles.skills} flex`}>
              {tools.map(q =>
                <SkillBar key={q.title} title={q.title} icon={q.icon} />
              )}   
            </div>   
          </div>
          <div className={`cardItem ${styles.worksWrap}`}>
            <h1>
                Recent Projects
            </h1>
            <div className={`flex ${styles.works}`}>
              {
                data.map(q => <Project key={q.title} data={q} />)
              }
            </div>
          </div>
        </div>
      </section>
    </PageBase>
  )
}
