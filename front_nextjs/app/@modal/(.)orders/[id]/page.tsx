"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getOrders, type OrderOut } from "@/libs/api/order";
import Modal from "@/components/Atoms/Modal/Modal";
import styles from "@/components/Organizm/OrdersModal/OrdersModal.module.css";
import Button from "@/components/Atoms/Button/Button";
import BackIcon from "@/assets/BackIcon";
import { OrderDescriptionCard } from "@/components/Organizm/OrderDescriptionCard/OrderDescriptionCard";

export default function OrderDescriptionPageModal() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [order, setOrder] = useState<OrderOut | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const id = Number(params.id);
    if (!id) return;

    (async () => {
      try {
        const all = await getOrders();
        const found = all.find((o) => o.id === id) || null;
        if (!found) setError("Заказ не найден");
        else setOrder(found);
      } catch (e) {
        console.error(e);
        setError("Не удалось загрузить заказ");
      } finally {
        setLoading(false);
      }
    })();
  }, [params.id]);

  const handleClose = () => {
    // Для intercept/parallel routes закрытие модалки = возврат назад к фону
    router.back();
  };

  return (
    <Modal
      isOpen={true}
      onClose={handleClose}
      className={styles.modalContainer}
    >
      <div className={styles.header}>
        <Button
          variant="white"
          icon={<BackIcon />}
          onClick={handleClose}
          className={styles.backButton}
        />
        <div className={styles.title}>
          {order ? `Заказ №${order.id}` : "Заказ"}
        </div>
      </div>

      <div className={styles.body}>
        {loading && <div>Загружаем заказ…</div>}
        {error && <div>{error}</div>}
        {!loading && !error && order && <OrderDescriptionCard order={order} />}
      </div>
    </Modal>
  );
}
