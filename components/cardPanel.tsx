import styles from "../styles/Home.module.scss";

import { PropsWithChildren } from "react";

interface CardPanelProps{
  id?: any,
  title?: any,
}

export default function CardPanel({ id, title, children }: PropsWithChildren<CardPanelProps>) {
  return (
    <div id={id} className={`cardItem ${styles.panel}`}>
      <h1> {title} </h1>
      {children}
    </div>
  );
}
