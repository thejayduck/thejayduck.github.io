import styles from "../styles/Blogs.module.scss";

import BlogItem from "../components/blogItem";
import CardPanel from "../components/cardPanel";
import PageBase from "../components/pageBase";

export async function getStaticProps() {
  const res = await fetch("https://gist.githubusercontent.com/thejayduck/f5c8e6b26e6ca02953eee1c4c9b9fe01/raw");
  const data = await res.json();

  return {
    props: {
      posts: data.posts,
    },
    revalidate: 10
  };
}

interface BlogProps {
    posts: any[]
}

export default function Blog ({posts}: BlogProps) {
  return (
    <PageBase>
      <div className={`flex flexColumn ${styles.posts}`}>
        {posts.map((q, idx) =>
          <BlogItem key={idx} id={idx} title={q.title} description={q.data} image={q.image} />
        )}
      </div>
    </PageBase>
  );
}