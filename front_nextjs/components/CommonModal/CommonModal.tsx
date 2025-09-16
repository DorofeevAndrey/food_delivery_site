import ProfileIcon from "@/assets/ProfileIcon";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import styles from "./CommonModal.module.css";
import { InstagramIcon } from "@/assets/InstagrammIcon";
import { TelegramIcon } from "@/assets/TelegramIcon";
import { VKontakteIcon } from "@/assets/VKontakteIcon";
import { WhatsAppIcon } from "@/assets/WhatsAppIcon";
import SocialLinks from "../SocialLinks/SocialLinks";
import { useRouter } from "next/navigation";

export default function CommonModal() {
  const router = useRouter();
  return (
    <Modal isOpen={true} onClose={() => {}} className={styles.headerModal}>
      <h1 className={styles.header}>Меню</h1>
      <Button
        variant="white"
        title="Частые вопросы"
        onClick={() => router.push("/faq")}
      />
      <div className={styles.addressContainer}>
        <Button variant="white" title="Черкасская улица, 15" />
        <Button variant="white" title="Доставка: 10:30 - 20:30" />
        <Button variant="white" title="В ресторане: 10: - 20:50" />
      </div>
      <Button variant="white" title="+7 (951) 455-69-46" />
      {/* <div className={styles.messangerContainer}>
        <Button
          variant="default"
          icon={<InstagramIcon height={28} width={28} />}
          onClick={() => {}}
        />
        <Button
          variant="default"
          icon={<TelegramIcon height={28} width={28} />}
          onClick={() => {}}
        />
        <Button
          variant="default"
          icon={<VKontakteIcon height={28} width={28} />}
          onClick={() => {}}
        />
        <Button
          variant="default"
          icon={<WhatsAppIcon height={28} width={28} />}
          onClick={() => {}}
        />
      </div> */}
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
