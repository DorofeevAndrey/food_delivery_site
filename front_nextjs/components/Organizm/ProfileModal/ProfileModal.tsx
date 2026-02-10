"use client";

import Modal from "../../Atoms/Modal/Modal";
import cn from "classnames";
import Button from "../../Atoms/Button/Button";
import Input from "../../Atoms/Input/Input";
import {
  deleteProfile,
  patchProfile,
  ProfileUpdateRequest,
} from "@/libs/api/profile";
import styles from "./ProfileModal.module.css";
import modalStyles from "../../Atoms/Modal/Modal.module.css";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";

import AddFriendIcon from "@/assets/AddFriendIcon";
import MyOrderIcon from "@/assets/MyOrderIcon";
import MyAddressIcon from "@/assets/MyAddressIcon";
import ProfileIcon from "@/assets/ProfileIcon";
import BankCardsIcon from "@/assets/BankCardsIcon";
import QuitIcon from "@/assets/QuitIcon";
import BackIcon from "@/assets/BackIcon";
import { useUser } from "@/hooks/useUser";

type ProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { user, setUser, logout } = useUser();

  const router = useRouter();
  const searchParams = useSearchParams();
  const isEdit = searchParams.get("edit") !== null;

  const [firstName, setFirstName] = useState(user!.first_name || "");

  const [email, setEmail] = useState(user!.email || "");
  const [emailError, setEmailError] = useState("");

  const [gender, setGender] = useState(user!.gender || "");
  const [openGender, setOpenGender] = useState(false);

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // месяцы с 0
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const dateStr = formatDate(new Date(user!.date_of_birth));

  const [dateOfBirth, setDateOfBirth] = useState(dateStr || "");
  const [dateError, setDateError] = useState(false);

  const genderRef = useRef<HTMLDivElement>(null);

  // закрытие dropdown при клике вне
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (genderRef.current && !genderRef.current.contains(e.target as Node)) {
        setOpenGender(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // валидация email
  const handleEmailChange = (value: string) => {
    setEmail(value);
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(regex.test(value) ? "" : "Некорректный email");
  };

  // форматирование даты dd.mm.yyyy
  const handleDateOfBirthChange = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 8);
    let formatted = "";
    if (digits.length <= 2) formatted = digits;
    else if (digits.length <= 4)
      formatted = digits.slice(0, 2) + "." + digits.slice(2);
    else
      formatted =
        digits.slice(0, 2) + "." + digits.slice(2, 4) + "." + digits.slice(4);

    setDateOfBirth(formatted);

    // проверка корректности даты
    if (formatted.length === 10) {
      const [day, month, year] = formatted.split(".");
      const date = new Date(+year, +month - 1, +day);
      if (
        date.getFullYear() === +year &&
        date.getMonth() === +month - 1 &&
        date.getDate() === +day
      )
        setDateError(false);
      else setDateError(true);
    } else setDateError(true);
  };

  const handleSelectGender = (value: string) => {
    setGender(value);
    setOpenGender(false);
  };

  const saveDisabled = !!emailError || dateError;

  const handleSaveProfile = async () => {
    if (saveDisabled) return;
    const userId = user!.id;

    const [day, month, year] = dateOfBirth.split(".");
    const formattedDate = `${year}-${month}-${day}`; // <-- чистая дата

    const patchUserData: ProfileUpdateRequest = {
      first_name: firstName,
      email: email,
      gender: gender,
      date_of_birth: formattedDate!,
    };

    try {
      const updatedUser = await patchProfile(userId, patchUserData);
      console.log("Профиль обновлён", updatedUser);
      setUser(updatedUser);
    } catch (error) {
      console.error("Ошибка при обновлении профиля", error);
    }
  };

  // Выход из профиля
  const handleQuitFromProfile = () => {
    logout();
    router.push("/");
  };

  const handleDeleteUser = async () => {
    const token = Cookies.get("token");
    const userId = user!.id;

    try {
      const deleted = await deleteProfile(userId);
      if (deleted) {
        console.log("Профиль удалён");
        // Например, можно перенаправить на главную страницу после удаления
        router.push("/");
      }
    } catch (error) {
      console.error("Ошибка при удалении профиля", error);
    }
  };

  return (
    <>
      {!isEdit ? (
        <Modal
          className={styles.profileModal}
          isOpen={isOpen}
          onClose={onClose}
          overlayClassName={cn(
            modalStyles.overlayTopRight,
            styles.profileOffsetPadding,
          )}
        >
          <div className={styles.headerContainer}>
            <Button
              className={styles.buttonName}
              title={user!.first_name || "Ваше имя"}
              onClick={() => router.push("/profile?edit")}
              variant="white"
            />
            <span className={styles.phone}>{user!.phone}</span>
          </div>

          <div className={styles.buttonsContainer}>
            <Button
              className={styles.filledButton}
              icon={<AddFriendIcon />}
              title="Приглашайте друзей"
              variant="white"
            />
            <Button
              className={styles.filledButton}
              icon={<MyOrderIcon />}
              title="Мои заказы"
              variant="white"
            />
            <Button
              className={styles.filledButton}
              icon={<MyAddressIcon />}
              title="Мои адреса"
              variant="white"
            />
            <Button
              className={styles.filledButton}
              icon={<ProfileIcon />}
              title="Мои данные"
              variant="white"
            />
            <Button
              className={styles.filledButton}
              icon={<BankCardsIcon />}
              title="Банковские карты"
              variant="white"
            />
          </div>

          <div className={styles.quitButtonContainer}>
            <Button
              className={styles.quitButton}
              icon={<QuitIcon />}
              title="Выйти"
              variant="white"
              onClick={handleQuitFromProfile}
            />
          </div>
        </Modal>
      ) : (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          className={styles.modalEdit}
          overlayClassName={cn(
            modalStyles.overlayTopRight,
            styles.profileOffsetPadding,
          )}
        >
          <Button
            className={styles.backToProfileButton}
            icon={<BackIcon />}
            variant="white"
            onClick={() => router.push("/profile")}
          />
          <h2 className={styles.h2}>Профиль</h2>

          <Input
            id="tel"
            placeholder="Телефон"
            value={user!.phone}
            onChange={() => {}}
            type="tel"
            disable
          />
          <Input
            id="name"
            placeholder="Имя"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
          />

          <div className={styles.dateContainer}>
            <Input
              id="date"
              placeholder="Дата рождения"
              value={dateOfBirth}
              onChange={(e) => handleDateOfBirthChange(e.target.value)}
              type="text"
            />
            {dateError && (
              <span className={styles.error}>Введите корректную дату</span>
            )}
          </div>

          <div className={styles.emailContainer}>
            <Input
              id="email"
              placeholder="Эл. почта"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              type="email"
            />
            {emailError && <span className={styles.error}>{emailError}</span>}
          </div>

          <div className={styles.genderContainer} ref={genderRef}>
            <Input
              id="gender"
              placeholder="Пол"
              value={gender}
              onChange={() => {}}
              type="text"
              readOnly
              onClick={() => setOpenGender(!openGender)}
            />
            {openGender && (
              <div className={styles.dropdown}>
                <div
                  className={styles.option}
                  onClick={() => handleSelectGender("Мужской")}
                >
                  Мужской
                </div>
                <div
                  className={styles.option}
                  onClick={() => handleSelectGender("Женский")}
                >
                  Женский
                </div>
              </div>
            )}
          </div>

          <Button
            title="Сохранить"
            onClick={handleSaveProfile}
            variant="orange"
            disable={saveDisabled}
          />
          <div className={styles.deleteButtonContainer}>
            <Button
              className={styles.deleteButton}
              title="Удалить аккаунт"
              onClick={handleDeleteUser}
              variant="white"
            />
          </div>
        </Modal>
      )}
    </>
  );
}
