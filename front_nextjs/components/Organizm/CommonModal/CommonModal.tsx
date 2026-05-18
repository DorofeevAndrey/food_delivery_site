import { useRouter } from "next/navigation"; // ✅ правильный импорт
import ProfileIcon from "@/assets/ProfileIcon";
import Button from "../../Atoms/Button/Button";
import Modal from "../../Atoms/Modal/Modal";
import SocialLinks from "../../Molecules/SocialLinks/SocialLinks"; // ✅ добавить импорт, если есть
import styles from "./CommonModal.module.css";
import modalStyles from "../../Atoms/Modal/Modal.module.css";
import cn from "classnames";

type CommonModalProps = {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
};

export default function CommonModal({
  isOpen,
  onClose,
  className,
}: CommonModalProps) {
  const router = useRouter(); // ✅ правильное использование

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={cn(styles.commonModal, className)}
      overlayClassName={cn(
        modalStyles.overlayTopLeft,
        styles.commonOffsetPadding,
      )}
    >
      <h1 className={styles.header}>Меню</h1>

      <Button
        variant="white"
        title="Частые вопросы"
        onClick={() => router.push("/faq")}
      />

      <div className={styles.addressContainer}>
        <Button variant="white" title="Черкасская улица, 15" />
        <Button variant="white" title="Доставка: 10:30 - 20:30" />
        <Button variant="white" title="В ресторане: 10:00 - 20:50" />
      </div>

      <Button variant="white" title="+7 (951) 455-69-46" />

      {/* Соцсети */}
      <SocialLinks />

      <div>
        <Button variant="white" title="Сообщить о проблеме" />
        <span>Версия f21c8a8e.dev</span>
      </div>

      <div className={styles.footerContainer}>
        <div>
          <span>Заказ в приложении ещё быстрее!</span>
          <div className={styles.downloadContainer}>
            <Button
              variant="default"
              icon={<ProfileIcon height={28} width={28} />}
              onClick={() => {}}
            />
            <Button
              variant="default"
              icon={<ProfileIcon height={28} width={28} />}
              onClick={() => {}}
            />
          </div>
        </div>
        <img
          src="/MyTelegramQRCode.svg"
          alt="Мой Telegram QR"
          width={82}
          height={82}
        />
      </div>
    </Modal>
  );
}
