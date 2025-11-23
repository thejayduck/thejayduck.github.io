import styles from "@/styles/Projects.module.scss";

import Head from "next/head";
import Link from "next/link";

import CardPanel from "@/components/cardPanel";
import PageBase from "@/components/pageBase";
import IProjectItem from "@/components/projects/IProjectItem";
import ProjectItem from "@/components/projects/projectItem";
import projects from "@/docs/json/projects.json";
import { getIcon } from "@/lib/helper";

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
        <meta
          property="og:image"
          content="https://ardarmutcu.com/api/og?title=Projects"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content="https://ardarmutcu.com/api/og?title=Projects"
        />
      </Head>
      <PageBase backPath="/" label="Back to Homepage">
        <section className={`${styles.mainSection}`}>
          <CardPanel title={"Projects 💡"}>
            <p>
              <i className={getIcon("projectPosts")} />
              <b>{projects.length} </b> Projects
            </p>
            <blockquote>
              <p>
                <i className={getIcon("error")} /> As the name suggests, this
                page is dedicated to my released projects.
                <br />
                <i className={getIcon("opensource")} /> Majority of them are
                open-source, and can be found on my{" "}
                <Link
                  href="https://github.com/thejayduck/"
                  aria-label="Github profile link"
                >
                  GitHub
                </Link>{" "}
                or{" "}
                <Link
                  href="https://codeberg.org/TheJayDuck"
                  aria-label="Codeberg profile link"
                >
                  Codeberg
                </Link>{" "}
                profile. Feel free to check them out!
              </p>
            </blockquote>
          </CardPanel>
          <div className={styles.projects}>
            {sortedYears.map((year) => (
              <div className={`${styles.yearOrder} cardItem`} key={year}>
                <h2 className={styles.yearTitle}>{year}</h2>
                <ul key={`${year}-projects`}>
                  {groupByYear[parseInt(year)].map(
                    (project: IProjectItem, index, array) => (
                      <div key={project.title}>
                        <ProjectItem {...project} />
                        {index !== array.length - 1 && <hr />}
                      </div>
                    )
                  )}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </PageBase>
    </>
  );
}
