"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button/Button";
import styles from "./LoginModal.module.css";
import { telegramLoginFinish, telegramLoginStart } from "@/libs/api/auth";
import CloseIcon from "@/assets/CloseIcon";
import { TelegramIcon } from "@/assets/TelegramIcon";
import Checkbox from "../Checkbox/Checkbox";
import PhoneInput from "../PhoneInput/PhoneInput";
import BackIcon from "@/assets/BackIcon";
import Link from "next/link";
import Cookies from "js-cookie";
import { Check } from "lucide-react";
import Modal from "../Modal/Modal";

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
  getProfile: () => void;
};

export default function LoginModal({
  isOpen,
  onClose,
  getProfile,
}: LoginModalProps) {
  const [phone, setPhone] = useState("+7 ");
  const [agree, setAgree] = useState(false);

  const [disableAuth, setDisableAuth] = useState<boolean>(true);

  const [step, setStep] = useState<"phone" | "waiting" | "finish">("phone");

  const [sessionId, setSessionId] = useState<string>("");
  const [botLink, setBotLink] = useState<string>("");

  useEffect(() => {
    const digits = phone.replace(/\D/g, "");

    if (digits.length === 11 && agree) {
      setDisableAuth(false);
    } else {
      setDisableAuth(true);
    }
  }, [phone, agree]);

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

    setStep("waiting");
  };

  const handleTelegramFinish = async () => {
    if (!sessionId) return alert("Сессия закончилась");

    try {
      const token = await telegramLoginFinish(sessionId);
      if (token) {
        Cookies.set("token", token, { expires: 2, secure: true });

        setStep("finish");

        setTimeout(() => {
          onClose();
          getProfile();
        }, 1500);
      } else {
        alert("Ошибка: " + JSON.stringify(token));
      }
    } catch (err) {
      console.error(err);
      alert("Произошла ошибка при запросе");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className={styles.containerModal}>
      {step == "phone" && (
        <>
          <Button
            className={styles.closeButton}
            onClick={() => onClose()}
            icon={<CloseIcon />}
            variant="white"
          ></Button>

          <h2 className={styles.title}>Войти в профиль</h2>
          <span className={styles.subtitle}>
            Укажите номер телефона и выберите способ подтверждения
          </span>

          <PhoneInput value={phone} onChange={setPhone} />

          <div className={styles.termsContainer}>
            <Checkbox checked={agree} onChange={setAgree} />
            <span className={styles.terms}>
              Продолжая регистрацию, вы соглашаетесь с условиями сбора и
              обработки персональных данных, правилами оферты и даете свое
              согласие на получение новостей и уведомлений
            </span>
          </div>

          <Button
            className={styles.telegramButton}
            onClick={() => handleTelegramLogin()}
            title="Войти через Telegram"
            icon={<TelegramIcon fill="#ffffff" />}
            disable={disableAuth}
            variant="orange"
          ></Button>
        </>
      )}
      {step == "waiting" && (
        <>
          <Button
            className={styles.backButton}
            onClick={() => setStep("phone")}
            icon={<BackIcon width={20} height={20} />}
            variant="white"
          ></Button>

          <h2 className={styles.title}>Ждём подтверждения в Telegram</h2>
          <p className={styles.subtitle}>
            Поделитесь контактом в Telegram c аккаунта с номером {phone} и
            нажмите «Готово»
          </p>
          <Link className={styles.botLink} href={botLink}>
            Перейти в Telegram
          </Link>
          <Button
            title="Готово"
            className={styles.finishButton}
            onClick={() => {
              handleTelegramFinish();
            }}
            variant="orange"
          />
        </>
      )}
      {step == "finish" && (
        <>
          <h2 className={styles.title}>Вы успешно зашли!</h2>
          <p className={styles.subtitle}>{phone}</p>
          <div className={styles.checkIcon}>
            <Check></Check>
          </div>
        </>
      )}
    </Modal>
  );
}
