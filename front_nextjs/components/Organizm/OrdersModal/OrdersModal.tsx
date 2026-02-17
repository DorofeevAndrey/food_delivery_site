"use client";

import { useRealtime } from "@/hooks/useRealtime";
import { useRouter } from "next/navigation";

import Modal from "@/components/Atoms/Modal/Modal";
import styles from "./OrdersModal.module.css";
import { useEffect, useState } from "react";
import { getOrders, type OrderOut } from "@/libs/api/order";
import OrderCard from "@/components/Molecules/OrderCard/OrderCard";
import Button from "@/components/Atoms/Button/Button";
import BackIcon from "@/assets/BackIcon";
import Skeleton from "@/components/Atoms/Sketelon/Skeleton";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function OrdersModal({ isOpen, onClose }: Props) {
  const [orders, setOrders] = useState<OrderOut[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useRealtime((msg) => {
    if (msg.type === "order_status_changed") {
      setOrders((prev) =>
        prev.map((p) =>
          p.id === msg.payload.order_id
            ? { ...p, status: msg.payload.status }
            : p,
        ),
      );
    }
  });

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    setError(null);
    getOrders()
      .then(setOrders)
      .catch(() => setError("Не удалось загрузить заказы"))
      .finally(() => setLoading(false));
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} className={styles.modalContainer}>
      <div className={styles.header}>
        <Button
          variant="white"
          icon={<BackIcon />}
          onClick={onClose}
          className={styles.backButton}
        />
        <div className={styles.title}>Мои заказы</div>
      </div>

      <div className={styles.body}>
        {loading && (
          <div className={styles.list}>
            {Array.from({ length: 3 }).map((_, idx) => (
              <Skeleton key={idx} height={80} borderRadius={16} />
            ))}
          </div>
        )}
        {error && <div>{error}</div>}
        {!loading && !error && orders.length === 0 && (
          <div>У вас ещё нет заказов</div>
        )}
        {!loading && !error && orders.length > 0 && (
          <div className={styles.list}>
            {orders.map((order) => (
              <div
                key={order.id}
                className={styles.clickableOrder}
                onClick={() => router.push(`/orders/${order.id}`)}
              >
                <OrderCard order={order} />
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}
