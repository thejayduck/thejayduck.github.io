import styles from "../styles/Home.module.scss";

import { PropsWithChildren } from "react";

interface CardPanelProps{
  title: any,
}

export default function CardPanel({ title, children }: PropsWithChildren<CardPanelProps>) {
  return (
    <div className={`cardItem ${styles.panel}`}>
      <h1> {title} </h1>
      {children}
    </div>
  );
}
