import styles from "../styles/PageBase.module.scss";

import { getIcon } from "../lib/helper";

import Button from "./button";

export default function PageBase({
  children,
  backPath,
  label,
}: {
  children: React.ReactNode;
  backPath?: string;
  label?: string;
}) {
  return (
    <main className={styles.container}>
      {backPath && (
        <div className={"flex flexRight backButton"}>
          <Button
            icon={`${getIcon("back")} ri-fw`}
            label={label?.toLowerCase()}
            title={label}
            href={backPath}
            newPage={false}
          />
        </div>
      )}
      {children}
    </main>
  );
}
