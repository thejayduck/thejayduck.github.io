import styles from "../styles/components/Project.module.scss";

interface ProjectProps{
    data: {
        title: string,
        links: any[],
        image: string,
        description: string,    
    }
}

export default function Project({ data }: ProjectProps) {

  return (
    <div 
      title={data.title} 
      className={`cardItem ${styles.projectWrap}`}
    >
      <div className={styles.social}>
        <ul onClick={(e) => e.stopPropagation()}>
          {data.links.map((q, idx) =>
            <li key={idx}>
              <a
                aria-label={q.title}
                title={q.title}
                href={q.url}
                className={`${q.icon} bx-tada-hover`}
                target="_blank"
                rel="noreferrer"
              ></a>
            </li>
          )}
        </ul>
      </div>

      <img
        className={styles.image}
        alt={`${data?.title} Cover`}
        src={data?.image || "/default.png"}
        height={256}
        width={500}
      />
      <div className={styles.details}>
        <h2>{data?.title ?? "No Title"}</h2>
        <p>
          {data?.description}
        </p>
      </div>
    </div>
  );
}