import styles from "../../styles/components/ProjectItem.module.scss";

import Image from "next/image";
import Link from "next/link";

import IProjectItem from "./IProjectItem";

interface ProjectItemProps {
  project: IProjectItem;
}

export default function ProjectItem({ project }: ProjectItemProps) {
  return (
    <li className={`${styles.projectItem}`}>
      <div className={styles.imageContainer}>
        <Image
          src={project.image}
          alt={"Project Image"}
          width={128}
          height={128}
          quality={75}
        />
        <div>
          {project.links.map((link) => (
            <Link
              className={styles.link}
              key={link.title}
              href={link.url}
              title={link.title}
              aria-label={link.title}
              passHref
            >
              <i className={link.icon}></i>
            </Link>
          ))}
        </div>
      </div>
      <div className={styles.postContainer}>
        <article>
          <Link href={project.links[0].url} passHref>
            <h2>{project.title}</h2>
          </Link>
          <div className={styles.tags}>
            {project.tags.map((tag, index) => (
              <span key={index} className={styles.tag}>
                {tag}
                {index !== project.tags.length - 1 && ","}
              </span>
            ))}
          </div>
          <p>{project.description}</p>
          <hr />
          <span className={styles.stats}>
            {project.type} | {project.genre ? `${project.genre} | ` : ""}
            {project.year}
          </span>
        </article>
      </div>
    </li>
  );
}
