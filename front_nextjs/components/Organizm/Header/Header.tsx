import { useEffect, useState } from "react";
import ProfileIcon from "@/assets/ProfileIcon";
import Button from "../../Atoms/Button/Button";
import CommonModal from "../CommonModal/CommonModal";
import styles from "./Header.module.css";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import LoginModal from "../LoginModal/LoginModal";
import { getProfile as fetchProfile } from "@/libs/api/profile";
import GordanLogo from "@/assets/GordanLogo";
import MenuIcon from "@/assets/MenuIcon";
import NotificationIcon from "@/assets/NotificationIcon";
import BasketIcon from "@/assets/BasketIcon";
import NotificationsModal from "../NotificationsModal/NotificationsModal";
import CartModal from "../CartModal/CartModal";
import { useCart } from "@/hooks/useCart";
import Skeleton from "@/components/Atoms/Sketelon/Skeleton";
import { useRealtime } from "@/hooks/useRealtime";
import type { NotificationDto } from "@/libs/api/notification";

export default function Header() {
  const { user, setUser, logout, refreshUser, isUserLoading } = useUser();
  const { totalCount } = useCart();

  const router = useRouter();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);

  const [toastNotification, setToastNotification] =
    useState<NotificationDto | null>(null);
  const [isToastVisible, setIsToastVisible] = useState(false);

  useRealtime((msg) => {
    if (msg.type === "notification_created") {
      const notif = msg.payload as NotificationDto;
      setToastNotification(notif);
      setIsToastVisible(true);
    }
  });

  useEffect(() => {
    if (!isToastVisible) return;
    const timer = setTimeout(() => setIsToastVisible(false), 5000);
    return () => clearTimeout(timer);
  }, [isToastVisible]);

  if (isUserLoading) {
    return (
      <header className={`${styles.header} ${styles.headerSkeleton}`}>
        <div className={styles.left}>
          <Skeleton width={80} height={40} borderRadius={8} />
        </div>
        <div className={styles.center}>
          <Skeleton width={200} height={40} borderRadius={6} />
        </div>
        <div className={styles.right}>
          <Skeleton width={80} height={40} borderRadius={8} />
        </div>
      </header>
    );
  }
  return (
    <>
      {toastNotification && isToastVisible && (
        <div className={styles.toast} onClick={() => setIsToastVisible(false)}>
          <div className={styles.toastTitle}>{toastNotification.title}</div>
          <div className={styles.toastText}>{toastNotification.text}</div>
        </div>
      )}
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
                getProfile={async () => {
                  const data = await fetchProfile();
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
          <Button
            title={String(totalCount)}
            onClick={() => setIsCardModalOpen(true)}
            icon={<BasketIcon />}
          />
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
      <CartModal
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
      />
    </>
  );
}
