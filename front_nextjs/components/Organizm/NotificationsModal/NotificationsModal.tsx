"use client";

import Modal from "../../Atoms/Modal/Modal";
import styles from "./NotificationsModal.module.css";
import modalStyles from "../../Atoms/Modal/Modal.module.css";
import NotificationItem from "../../Molecules/Notification/NotificationItem";
import CloseIcon from "@/assets/CloseIcon";
import Button from "../../Atoms/Button/Button";
import NotificationIcon from "@/assets/NotificationIcon";
import cn from "classnames";
import {
  getNotifications,
  markNotificationRead,
  NotificationDto,
} from "@/libs/api/notification";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Skeleton from "@/components/Atoms/Sketelon/Skeleton";
import { useRouter } from "next/navigation";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function NotificationsModal({ isOpen, onClose }: Props) {
  const [items, setItems] = useState<NotificationDto[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!isOpen) return;
    const token = Cookies.get("auth_token");

    if (!token) return;

    setLoading(true);
    getNotifications()
      .then(setItems)
      .finally(() => setLoading(false));
  }, [isOpen]);

  const handleAction = async (id: number, orderId?: number | null) => {
    const token = Cookies.get("auth_token");
    if (!token) return;

    const updated = await markNotificationRead(id);
    setItems((prev) => prev.map((n) => (n.id === id ? updated : n)));

    if (orderId) {
      router.push(`/orders/${orderId}`);
    }
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
        {loading &&
          Array.from({ length: 3 }).map((_, idx) => (
            <Skeleton key={idx} height={56} borderRadius={12} />
          ))}
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
                isUnread: !n.is_read,
                orderId: n.order_id ?? null,
              }}
              onAction={(_, orderId) => handleAction(n.id, orderId)}
            />
          ))}
      </div>
    </Modal>
  );
}
