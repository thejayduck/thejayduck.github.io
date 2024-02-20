import styles from "../../styles/components/projects/ProjectItem.module.scss";

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
          alt={""}
          width={128}
          height={128}
          quality={75}
        />
        <div>
          {project.links.map((link) => (
            <Link
              className={styles.link}
              href={link.url}
              key={link.title}
              passHref
              title={link.title}
              aria-label={link.title}
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
              </span>
            ))}
          </div>
          <p>{project.description}</p>
          {/* {project.links.map((link) => (
            <Link
              className={styles.link}
              href={link.url}
              key={link.title}
              passHref
              title={link.title}
              aria-label={link.title}
            >
              <i className={link.icon}></i>
            </Link>
          ))} */}

          <hr />
          <span className={styles.stats}>
            <b>Release Date</b>: {project.year} 🗓️ | <b>Genre</b>:{" "}
            {project.genre}
          </span>
        </article>
      </div>
    </li>
  );
}
