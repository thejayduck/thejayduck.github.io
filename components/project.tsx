import styles from "../styles/components/Project.module.scss";

interface ProjectProps{
    data: {
        title: string,
        links: any[],
        image: string,
        description: string,    
    }
    details: boolean,
}

export default function Project({ data, details = true }: ProjectProps) {

  return (
    <a 
      title={data.title} 
      href={details ? data.links[0].url : data.image} 
      target="_blank"
      rel="noreferrer"
      className={`cardItem ${styles.projectWrap}`}
    >
      <div className={styles.social} >
        <ul onClick={(e) => e.stopPropagation()}>
          {details &&
            data.links.map(q =>
              <li key={q.title}>
                <a
                  aria-label={q.title}
                  title={q.title}
                  href={q.url}
                  className={`${q.icon} bx-tada-hover`}
                  target="_blank"
                  rel="noreferrer"
                />
              </li>)
          }
        </ul>
      </div>

      <img
        className={styles.image}
        alt={`${data.title} Cover`}
        height={256}
        width={500}
        src={data.image}
      />
      {details && 
        <div className={styles.details}>
          <h2>{data.title ?? "No Title"}</h2>
          <div>
            <p>
              {data.description}
            </p>
          </div>
        </div>
      }
    </a>
  );
}