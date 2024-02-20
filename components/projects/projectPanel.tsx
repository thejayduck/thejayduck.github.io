import styles from "../../styles/components/projects/ProjectPanel.module.scss";

import projects from "../../docs/json/projects.json";

import IProjectItem from "./IProjectItem";
import ProjectItem from "./projectItem";

export default function ProjectPanel() {
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
    <div className={styles.projects}>
      {sortedYears.map((year) => (
        <div key={year}>
          <h3>{year}</h3>
          <ul>
            {groupByYear[parseInt(year)].map((project, index) => (
              <ProjectItem project={project} key={index} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
