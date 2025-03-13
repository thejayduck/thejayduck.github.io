import styles from "../styles/Error.module.scss";

import Image from "next/image";

import PageBase from "../components/pageBase";

export default function Error404() {
  return (
    <PageBase backPath="/" label="Back to Homepage">
      <div className={`${styles.mainSection} cardItem`}>
        <h1>
          <i className="bx bx-error" /> Error 404 - Page Not Found{" "}
          <i className="bx bx-error" />
        </h1>
        <span>
          Here&apos;s a random gradient instead... or you can simply go back.
        </span>
        <Image width={200} height={200} src="/error.svg" alt="Error" />
      </div>
    </PageBase>
  );
}
