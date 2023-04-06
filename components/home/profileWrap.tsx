import styles from "../../styles/Home.module.scss";

import SocialItem from "../socialItem";

export default function ProfileWrap() {
  return (
    <section className={`${styles.profileWrap}`}>
      <img className={styles.picture} alt="Profile Picture" src="/profileAlt.jpg" width={256} />
      <div className={styles.navigation}>
        <ul className={`${styles.pageList}`}>
          <SocialItem icon="bx bxs-box" label="blog" title="Blog" href="/blog" newPage={false} />
          <SocialItem icon="bx bxs-detail" label="resume" title="Resume" href="/resume" newPage={false} />
          <SocialItem icon="bx bxs-image" label="gallery" title="Gallery" href="/gallery" newPage={false} />
        </ul>
        <ul className={`${styles.socialList}`}>
          <SocialItem icon="bx bxl-github" label="github" title="Github" href="https://github.com/thejayduck" />
          <SocialItem icon="bx bxs-store" label="itch.io" title="Itch.io" href="https://thejayduck.itch.io/" />
          {/* <SocialItem icon="bx bxl-deviantart" label="deviantart" href="https://www.deviantart.com/thejayduck/" /> */}
          <SocialItem icon="bx bxl-instagram-alt" label="instagram" title="Instagram" href="https://www.instagram.com/ardafevzi.armutcu/" />
          <SocialItem icon="bx bxl-gmail" label="gmail" title="Gmail" href="mailto:ardafevzi.armutcu@gmail.com" />
        </ul>
      </div>
    </section>
  );
}