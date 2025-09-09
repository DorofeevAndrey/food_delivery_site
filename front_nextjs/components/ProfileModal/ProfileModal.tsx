"use client";

import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import { ProfileResponse } from "@/lib/api/profile";
import ProfileIcon from "@/assets/ProfileIcon";

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
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <>
        {userProfile.first_name ? (
          <Button title={userProfile.first_name} />
        ) : (
          <Button title="Ваше имя" />
        )}
      </>
    </Modal>
  );
}
