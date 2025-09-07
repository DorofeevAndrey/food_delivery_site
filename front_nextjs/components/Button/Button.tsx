"use client"; // Важно! События работают только в Client Components

import styles from "./Button.module.css";
import React, { ReactNode } from "react";

type Props = {
  title: string;
  onClick?: () => void;
  icon?: ReactNode;
};

export default function Button({ title, onClick, icon }: Props) {
  return (
    <button className={styles.button} onClick={onClick}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {<span>{title}</span>}
    </button>
  );
}
