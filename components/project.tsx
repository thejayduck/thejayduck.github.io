import styles from "../styles/components/Project.module.scss";

import { motion } from "framer-motion";

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
    <motion.div title={data.title} className={`cardItem ${styles.projectWrap}`}>
      <div className={styles.social} >
        <ul onClick={(e) => e.stopPropagation()}>
          {
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

      <div className={styles.imageWrap}>
        <img
          className={styles.image}
          alt={`${data.title} Cover`}
          height={256}
          width={500}
          src={data.image}

        />
      </div>
      <div className={styles.details}>
        <h2>{data.title ?? "No Title"}</h2>
        <motion.div
          layout
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "max-content", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ type: "spring", duration: 0.4 }}
        >
          <p>
            {data.description}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}