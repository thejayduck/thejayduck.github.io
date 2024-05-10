import styles from "../styles/Projects.module.scss";

import Head from "next/head";

import Button from "../components/button";
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
          <div className={styles.projects}>
            {sortedYears.map((year) => (
              <div className={`${styles.yearOrder} cardItem`} key={year}>
                <h2 className={styles.yearTitle}>{year}</h2>
                <ul>
                  {groupByYear[parseInt(year)].map((project, index, array) => (
                    <>
                      <ProjectItem project={project} key={index} />
                      {index !== array.length - 1 && <hr />}
                    </>
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
