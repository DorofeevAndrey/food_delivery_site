"use client";

import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import { ProfileResponse } from "@/libs/api/profile";
import styles from "./ProfileModal.module.css";
import ProfileIcon from "@/assets/ProfileIcon";
import AddFriendIcon from "@/assets/AddFriendIcon";
import MyOrderIcon from "@/assets/MyOrderIcon";
import BankCardsIcon from "@/assets/BankCardsIcon";
import MyAddressIcon from "@/assets/MyAddressIcon";
import QuitIcon from "@/assets/QuitIcon";
import { useSearchParams, useRouter } from "next/navigation";

type ProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
  userProfile: ProfileResponse;
};

export default function ProfileModal({
  userProfile,
  isOpen,
  onClose,
}: ProfileModalProps) {
  const searchParams = useSearchParams();
  const isEdit = searchParams.get("edit") !== null;
  const router = useRouter();

  return (
    <Modal className={styles.modal} isOpen={isOpen} onClose={onClose}>
      {!isEdit ? (
        <>
          <div className={styles.headerContainer}>
            {userProfile.first_name ? (
              <Button
                className={styles.buttonName}
                title={userProfile.first_name}
                onClick={() => router.push("/profile?edit")}
                variant="white"
              />
            ) : (
              <Button
                className={styles.buttonName}
                title="Ваше имя"
                onClick={() => router.push("/profile?edit")}
                variant="white"
              />
            )}
            <span className={styles.phone}>{userProfile.phone}</span>
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
            />
          </div>
        </>
      ) : (
        <>
          <h2 className={styles.h2}>Профиль</h2>
        </>
      )}
    </Modal>
  );
}
