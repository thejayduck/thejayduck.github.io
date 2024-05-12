import styles from "../styles/Projects.module.scss";

import Head from "next/head";
import Link from "next/link";

import Button from "../components/button";
import CardPanel from "../components/cardPanel";
import PageBase from "../components/pageBase";
import IProjectItem from "../components/projects/IProjectItem";
import ProjectItem from "../components/projects/projectItem";
import projects from "../docs/json/projects.json";

//? Improve the layout of the page
export default function Projects() {
  const groupByYear: { [year: number]: IProjectItem[] } = projects.reduce(
    (acc, project) => {
      const year = project.year;
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(project);
      return acc;
    },
    {} as { [year: number]: IProjectItem[] }
  );

  const sortedYears = Object.keys(groupByYear).sort(
    (a, b) => parseInt(b) - parseInt(a)
  );

  return (
    <>
      <Head>
        <title>Projects · Arda Fevzi Armutcu</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Arda Fevzi Armutcu's Projects" />
      </Head>
      <PageBase>
        <ul className={"flex flexRight backButton"}>
          <Button
            icon="bx bx-undo"
            label="back to homepage"
            title="Back to Homepage"
            href="/"
            newPage={false}
          />
        </ul>
        <div>
          <CardPanel title={"Projects 💡"}>
            <p>
              📮
              <b>{projects.length} </b> Projects
              <br />
              ❗As the name suggests, this page is dedicated to my released
              projects.
              <br />
              🔓Majority of them are open-source, and can be found on my{" "}
              <Link
                href="https://github.com/thejayduck/"
                aria-label="Github profile link"
              >
                GitHub profile
              </Link>
              . Feel free to check them out!
            </p>
          </CardPanel>
          <div className={styles.projects}>
            {sortedYears.map((year) => (
              <div className={`${styles.yearOrder} cardItem`} key={year}>
                <h2 className={styles.yearTitle}>{year}</h2>
                <ul key={`${year}-projects`}>
                  {groupByYear[parseInt(year)].map((project, index, array) => (
                    <div key={project.title}>
                      <ProjectItem project={project} />
                      {index !== array.length - 1 && <hr />}
                    </div>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </PageBase>
    </>
  );
}
