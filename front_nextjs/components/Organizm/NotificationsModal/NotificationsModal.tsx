"use client";

import Modal from "../../Atoms/Modal/Modal";
import styles from "./NotificationsModal.module.css";
import modalStyles from "../../Atoms/Modal/Modal.module.css";
import NotificationItem, {
  NotificationData,
} from "../../Molecules/Notification/NotificationItem";
import CloseIcon from "@/assets/CloseIcon";
import Button from "../../Atoms/Button/Button";
import NotificationIcon from "@/assets/NotificationIcon";
import cn from "classnames";
import NotificationMessageIcon from "@/assets/NotificationMessageIcon";
import { useUser } from "@/hooks/useUser";
import {
  getNotifications,
  markNotificationRead,
  NotificationDto,
} from "@/libs/api/notification";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function NotificationsModal({ isOpen, onClose }: Props) {
  const [items, setItems] = useState<NotificationDto[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const token = Cookies.get("token");

    if (!token) return;

    setLoading(true);
    getNotifications()
      .then(setItems)
      .finally(() => setLoading(false));
  }, [isOpen]);

  const handleAction = async (id: number) => {
    const token = Cookies.get("token");
    if (!token) return;

    const updated = await markNotificationRead(id);
    setItems((prev) => prev.map((n) => (n.id === id ? updated : n)));
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={styles.modalContainer}
      overlayClassName={cn(
        modalStyles.overlayTopRight,
        styles.notificationOffsetPadding,
      )}
    >
      <div className={styles.header}>
        <div className={styles.title}>Уведомления</div>
        <Button variant="white" icon={<CloseIcon />} onClick={onClose} />
      </div>

      <div className={styles.list}>
        {loading && <div>Загружаем...</div>}
        {!loading &&
          items.map((n) => (
            <NotificationItem
              key={n.id}
              data={{
                id: String(n.id),
                title: n.title,
                text: n.text,
                createdAt: new Date(n.created_at).toLocaleString("ru-RU"),
                icon: <NotificationIcon />,
                actionLabel: n.is_read ? undefined : "Перейти",
              }}
              onAction={() => handleAction(n.id)}
            />
          ))}
      </div>
    </Modal>
  );
}
