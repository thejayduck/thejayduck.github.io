import styles from "../styles/components/ProjectCell.module.scss";

import Image from "next/image";

interface ProjectProps {
  data: {
    title: string;
    links: any[];
    image: string;
    description: string;
    type: string;
    genre: string;
  };
}

export default function ProjectCell({ data }: ProjectProps) {
  return (
    <div
      title={`Project - ${data.title}`}
      className={`cardItem ${styles.projectCell}`}
    >
      <div className={styles.projectThumb}>
        <a href={data.links[0].url} target="_blank" rel="noreferrer">
          <Image
            className={styles.image}
            alt={`${data?.title} Cover`}
            src={data?.image || "/default.png"}
            height={256}
            width={500}
          />
        </a>
      </div>

      <div className={styles.projectData}>
        <div className={styles.projectTitle}>
          <a href={data.links[0].url} target="_blank" rel="noreferrer">
            {data.title}
          </a>
        </div>
        <div className={styles.projectText}>{data.description}</div>

        <div className={styles.projectGenre}>
          {data.type} {">"} {data.genre}
        </div>

        <div className={styles.projectLinks}>
          <ul>
            {data.links.map((q, idx) => (
              <li key={idx}>
                <a
                  aria-label={q.title}
                  title={`View This Project on ${q.title}`}
                  href={q.url}
                  className={`${q.icon} bx-tada-hover`}
                  target="_blank"
                  rel="noreferrer"
                ></a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
