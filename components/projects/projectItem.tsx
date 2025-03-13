import styles from "../../styles/components/ProjectItem.module.scss";

import Image from "next/image";
import Link from "next/link";

import { placeholderImage } from "../imageShimmer";

import IProjectItem from "./IProjectItem";

export default function ProjectItem(project: IProjectItem) {
  return (
    <li className={`${styles.projectItem}`}>
      <div className={styles.imageContainer}>
        <Image
          src={project.image}
          alt={"Project Image"}
          width={128}
          height={128}
          placeholder={placeholderImage(128, 128)}
          quality={75}
        />
      </div>
      <div className={styles.postContainer}>
        <article>
          <span className={styles.stats}>
            {project.type} {project.genre ? `| ${project.genre}` : ""}
          </span>
          <div className={styles.header}>
            <Link href={project.links[0].url} passHref>
              <h2>{project.title}</h2>
            </Link>
            <div className={styles.links}>
              {project.links.map((link) => (
                <Link
                  className={styles.link}
                  key={link.title}
                  href={link.url}
                  title={link.title}
                  aria-label={link.title}
                  passHref
                >
                  <i className={`${link.icon} bx-tada-hover`}></i>
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.tags}>
            {project.tags.map((tag, index) => (
              <span key={index} className={styles.tag}>
                {tag}
                {index !== project.tags.length - 1 && ","}
              </span>
            ))}
          </div>
          <p>{project.description}</p>
        </article>
      </div>
    </li>
  );
}
