"use client";

import styles from "./Button.module.css";
import React, { ReactNode } from "react";
import cn from "classnames"; // <- импортируем библиотеку

type ButtonProps = {
  title?: string;
  onClick?: () => void;
  icon?: ReactNode;
  className?: string;
  disable?: boolean;
};

export default function Button({
  title,
  onClick,
  icon,
  className,
  disable,
}: ButtonProps) {
  return (
    <button
      className={cn(styles.button, className)}
      onClick={onClick}
      disabled={disable}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span>{title}</span>
    </button>
  );
}
