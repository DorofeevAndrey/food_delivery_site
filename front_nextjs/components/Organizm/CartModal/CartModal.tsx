"use client";

import Modal from "@/components/Atoms/Modal/Modal";
import styles from "./CartModal.module.css";
import modalStyles from "../../Atoms/Modal/Modal.module.css";
import cn from "classnames";
import { useState } from "react";
import Button from "@/components/Atoms/Button/Button";

type CartModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  type Mode = "delivery" | "restaurant";
  const [mode, setMode] = useState<Mode>("delivery");

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={styles.modalContainer}
      overlayClassName={cn(
        modalStyles.overlayTopRight,
        styles.cartModalOffsetPadding,
      )}
    >
      <div className={styles.header}>Корзина</div>
      <div className={styles.modeToggle}>
        <Button
          title="Доставка"
          variant={mode === "delivery" ? "orange" : "grey"}
          className={styles.modeButton}
          onClick={() => setMode("delivery")}
        />
        <Button
          title="В ресторане"
          variant={mode === "restaurant" ? "orange" : "grey"}
          className={styles.modeButton}
          onClick={() => setMode("restaurant")}
        />
      </div>
      <div className={styles.body}>Тут список товаров</div>
      <div className={styles.footer}>Кнопка оформить заказ</div>
    </Modal>
  );
}
