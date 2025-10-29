import { useState } from "react";
import ProfileIcon from "@/assets/ProfileIcon";
import Button from "../Button/Button";
import CommonModal from "../CommonModal/CommonModal";
<<<<<<< HEAD
import styles from "./Header.module.css";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import LoginModal from "../LoginModal/LoginModal";
import { getProfile } from "@/libs/api/profile";
import GordanLogo from "@/assets/GordanLogo";
import MenuIcon from "@/assets/MenuIcon";
import NotificationIcon from "@/assets/NotificationIcon";
import BasketIcon from "@/assets/BasketIcon";
import NotificationsModal from "../NotificationsModal/NotificationsModal";

export default function Header() {
  const { user, setUser, logout, refreshUser, isUserLoading } = useUser();

  const router = useRouter();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  if (isUserLoading) {
    return (
      <header className={`${styles.header} ${styles.headerSkeleton}`}>
        <div className={styles.left}>
          <div className={styles.skelBox} />
        </div>
        <div className={styles.center}>
          <div className={styles.skelLogo} />
        </div>
        <div className={styles.right}>
          <div className={styles.skelBox} />
        </div>
      </header>
    );
  }
  return (
    <>
      <header className={styles.header}>
        <div className={styles.left}>
          <Button
            variant="default"
            icon={<MenuIcon />}
            onClick={() => setIsMenuModalOpen(true)}
          />
        </div>

        <div className={styles.center}>{<GordanLogo />}</div>

        <div className={styles.right}>
          {!user ? (
            <>
              <Button
                title={"Войти"}
                onClick={() => setIsLoginModalOpen(true)}
                icon={<ProfileIcon />}
              />
              <LoginModal
                getProfile={async (token) => {
                  const data = await getProfile(token);
                  setUser(data);
                }}
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
              />
            </>
          ) : (
            <Button
              onClick={() => router.push("/profile")}
              icon={<ProfileIcon />}
            />
          )}
          <Button
            onClick={() => setIsNotificationsOpen(true)}
            icon={<NotificationIcon />}
          />
          <Button onClick={() => {}} icon={<BasketIcon />} />
        </div>
      </header>
      <CommonModal
        isOpen={isMenuModalOpen}
        onClose={() => setIsMenuModalOpen(false)}
      />
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </>
=======
import MenuIcon from "@/assets/MenuIcon";
import styles from "./Header.module.css";
import { useRouter } from "next/navigation";
import GordanIcon from "@/assets/GordanIcon";

export default function Header() {
  const router = useRouter();
  return (
    <header className={styles.headerContainer}>
      <Button variant="default" icon={<MenuIcon />} onClick={() => {}} />
      <a
        href="/"
        className="flex items-center p-2 bg-gray-100 hover:bg-gray-200 rounded"
      >
        <GordanIcon width={232} height={37.83} className="text-red-500" />
      </a>
      <Button title={"Войти"} onClick={() => {}} icon={<ProfileIcon />} />
    </header>

    // <CommonModal></CommonModal>
>>>>>>> 90b41b270e9a67161a330b44968a5a45aab49186
  );
}
