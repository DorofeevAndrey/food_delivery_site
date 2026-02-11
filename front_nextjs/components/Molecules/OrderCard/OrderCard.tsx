"use client";

import styles from "./OrderCard.module.css";
import type { OrderOut } from "@/libs/api/order";

type Props = {
  order: OrderOut;
};

const STATUS_LABEL: Record<OrderOut["status"], string> = {
  pending: "В обработке",
  confirmed: "Подтверждён",
  completed: "Завершён",
  cancelled: "Отменён",
};

export default function OrderCard({ order }: Props) {
  const { id, mode, status, total_price, address, items } = order;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <div className={styles.id}>Заказ №{id}</div>
          <div className={styles.mode}>
            {mode === "delivery" ? "Доставка" : "В ресторане"}
          </div>
        </div>
        <div className={styles.status + " " + styles[status]}>
          {STATUS_LABEL[status]}
        </div>
      </div>

      <div className={styles.meta}>
        <span>Сумма: {total_price} ₽</span>
        {address && <span className={styles.address}>{address}</span>}
      </div>

      <ul className={styles.items}>
        {items.map((item) => (
          <li key={item.id} className={styles.itemRow}>
            <span className={styles.itemName}>{item.product_name}</span>
            <span className={styles.itemQty}>
              {item.quantity} × {item.product_price} ₽
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
