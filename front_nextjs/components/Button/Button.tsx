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
  variant?: "default" | "white" | "orange" | "grey";
};

export default function Button({
  title,
  onClick,
  icon,
  className,
  disable,
  variant = "default",
}: ButtonProps) {
  const hasBoth = icon && title;
  return (
    <button
      className={cn(
        styles.button,
        styles[variant],
        { [styles.withGap]: hasBoth }, // добавляем класс только если оба есть
        className
      )}
      onClick={onClick}
      disabled={disable}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.title}>{title}</span>
    </button>
  );
}
