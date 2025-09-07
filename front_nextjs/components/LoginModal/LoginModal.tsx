"use client";

import { useState } from "react";
import Button from "@/components/Button/Button";
import styles from "./LoginModal.module.css";
import { telegramLoginStart } from "@/lib/api/auth";
import CloseIcon from "@/assets/CloseIcon";
import TelegramIcon from "@/assets/TelegramIcon";
import Checkbox from "../Checkbox/Checkbox";
import PhoneInput from "../PhoneInput/PhoneInput";

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [phone, setPhone] = useState("+7 ");
  const [agree, setAgree] = useState(false);

  const [sessionId, setSessionId] = useState<string | null>(null);
  const [botLink, setBotLink] = useState<string | null>(null);

  console.log(phone);

  if (!isOpen) return null;

  const handleTelegramLogin = async () => {
    if (!phone) return alert("Введите номер телефона");

    try {
      const data = await telegramLoginStart(phone);
      if (data.session_id && data.bot_link) {
        // Сохраняем данные
        setSessionId(data.session_id);
        setBotLink(data.bot_link);
        // Открываем Telegram
        window.open(data.bot_link, "_blank");
      } else {
        alert("Ошибка: " + JSON.stringify(data));
      }
    } catch (err) {
      console.error(err);
      alert("Произошла ошибка при запросе");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <Button
          className={styles.closeButton}
          onClick={() => onClose()}
          icon={<CloseIcon width={20} height={20} />}
        ></Button>

        <h2 className={styles.title}>Войти в профиль</h2>
        <p className={styles.subtitle}>
          Укажите номер телефона и выберите способ подтверждения
        </p>

        <PhoneInput value={phone} onChange={setPhone} />

        <div className={styles.termsContainer}>
          <Checkbox checked={agree} onChange={setAgree} />
          <p className={styles.terms}>
            Продолжая регистрацию, вы соглашаетесь с условиями сбора и обработки
            персональных данных, правилами оферты и даете свое согласие на
            получение новостей и уведомлений
          </p>
        </div>

        <Button
          className={styles.telegramButton}
          onClick={() => handleTelegramLogin()}
          title="Войти через Telegram"
          icon={<TelegramIcon fill="#ffffff" />}
        ></Button>
      </div>
    </div>
  );
}
