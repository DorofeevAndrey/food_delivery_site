"use client";

import Modal from "../Modal/Modal";
import styles from "./NotificationsModal.module.css";
import modalStyles from "../Modal/Modal.module.css";
import NotificationItem, {
  NotificationData,
} from "../Notification/NotificationItem";
import CloseIcon from "@/assets/CloseIcon";
import Button from "../Button/Button";
import NotificationIcon from "@/assets/NotificationIcon";
import cn from "classnames";
import NotificationMessageIcon from "@/assets/NotificationMessageIcon";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const mock: NotificationData[] = [
  {
    id: "1",
    title: "Скидка на комбо",
    text: "Только сегодня: -20% на все комбо меню.",
    createdAt: "Сегодня, 12:45",
    icon: <NotificationIcon />,
    actionLabel: "Перейти",
  },
  {
    id: "2",
    title: "Доставка стала быстрее",
    text: "Мы обновили маршруты — ждите курьера быстрее.",
    createdAt: "Вчера, 18:10",
    icon: <NotificationIcon />,
    actionLabel: "Перейти",
  },
];

export default function NotificationsModal({ isOpen, onClose }: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={styles.modalContainer}
      overlayClassName={cn(
        modalStyles.overlayTopRight,
        styles.notificationOffsetPadding
      )}
    >
      <div className={styles.header}>
        <div className={styles.title}>Уведомления</div>
        <Button variant="white" icon={<CloseIcon />} onClick={onClose} />
      </div>

      <div className={styles.list}>
        {mock.map((n) => (
          <NotificationItem key={n.id} data={n} onAction={() => {}} />
        ))}
      </div>
    </Modal>
  );
}
