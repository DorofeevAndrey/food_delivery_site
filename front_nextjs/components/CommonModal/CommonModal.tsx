import ProfileIcon from "@/assets/ProfileIcon";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import styles from "./CommonModal.module.css";

export default function CommonModal() {
  return (
    <Modal isOpen={true} onClose={() => {}} className={styles.headerModal}>
      <h1 className={styles.header}>Меню</h1>
      <Button variant="white" title="Частые вопросы" />
      <div className={styles.addressContainer}>
        <Button variant="white" title="Черкасская улица, 15" />
        <Button variant="white" title="Доставка: 10:30 - 20:30" />
        <Button variant="white" title="В ресторане: 10: - 20:50" />
      </div>
      <Button variant="white" title="+7 (951) 455-69-46" />
      <div className={styles.messangerContainer}>
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
        <Button
          variant="default"
          icon={<ProfileIcon height={28} width={28} />}
          onClick={() => {}}
        />
      </div>
    </Modal>
  );
}
