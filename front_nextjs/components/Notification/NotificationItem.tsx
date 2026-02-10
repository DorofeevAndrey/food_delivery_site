"use client";

import styles from "./NotificationItem.module.css";
import Button from "../Button/Button";
import { ReactNode } from "react";
import NotificationMessageIcon from "@/assets/NotificationMessageIcon";

export type NotificationData = {
  id: string;
  title: string;
  text: string;
  createdAt: string; // ISO or human string
  icon?: ReactNode;
  actionLabel?: string;
  actionHref?: string;
};

type Props = {
  data: NotificationData;
  onAction?: (id: string) => void;
};

export default function NotificationItem({ data, onAction }: Props) {
  const { id, title, text, createdAt, icon, actionLabel = "Перейти" } = data;

  return (
    <div className={styles.item}>
      <div className={styles.icon}>
        <NotificationMessageIcon />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.text}>{text}</div>
        <div className={styles.metaRow}>
          <span className={styles.date}>{createdAt}</span>
          <Button
            className={styles.actionButton}
            title={actionLabel}
            variant="grey"
            onClick={() => onAction?.(id)}
          />
        </div>
      </div>
    </div>
  );
}
