"use client";

import styles from "./Button.module.css";
import React, { ReactNode } from "react";
import cn from "classnames"; // <- импортируем библиотеку

type ButtonProps = {
  title?: string;
  onClick?: () => void;
  icon?: ReactNode;
  className?: string; // <- проп для дополнительных классов
};

export default function Button({
  title,
  onClick,
  icon,
  className,
}: ButtonProps) {
  return (
    <button
      className={cn(styles.button, className)} // <- объединяем стили
      onClick={onClick}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span>{title}</span>
    </button>
  );
}
