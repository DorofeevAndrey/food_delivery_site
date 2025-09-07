"use client";

import { useState } from "react";
import Button from "@/components/Button/Button";
import ProfileIcon from "@/assets/ProfileIcon";
import styles from "./LoginModal.module.css";

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [phone, setPhone] = useState("");

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <Button
          className={styles.close}
          onClick={() => onClose}
          icon={<ProfileIcon width={20} height={20} />}
        ></Button>
        <h2 className={styles.title}>Войти в профиль</h2>
        <p className={styles.subtitle}>
          Укажите номер телефона и выберите способ подтверждения
        </p>
        <div className={styles.inputGroup}>
          <label>+7</label>
          <input
            type="text"
            placeholder="Укажите номер телефона"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={styles.input}
          />
        </div>
        <p className={styles.terms}>
          Продолжая регистрацию, вы соглашаетесь с условиями сбора и обработки
          персональных данных, правилами оферты и даете свое согласие на
          получение новостей и уведомлений
        </p>

        <Button
          onClick={() => alert("Continue with phone " + phone)}
          title="Войти через Telegram"
          icon={<ProfileIcon width={20} height={20} />}
        ></Button>
      </div>
    </div>
  );
}
