import styles from "../styles/Error.module.scss";

import Image from "next/image";

import Button from "../components/button";
import PageBase from "../components/pageBase";

export default function Error404() {
  return (
    <PageBase>
      <ul className={"flex flexRight backButton"}>
        <Button
          icon="bx bx-undo"
          label="back to homepage"
          title="Back to Homepage"
          href="/"
          newPage={false}
        />
      </ul>
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
