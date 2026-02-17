"use client";

import { OrderOut } from "@/libs/api/order";

const STATUS_LABEL: Record<OrderOut["status"], string> = {
  pending: "В обработке",
  confirmed: "Подтверждён",
  completed: "Завершён",
  cancelled: "Отменён",
};

function formatDateTimeRu(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function OrderDescriptionCard({ order }: { order: OrderOut }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div>
        Статус: <strong>{STATUS_LABEL[order.status]}</strong>
      </div>
      <div>Создан: {formatDateTimeRu(order.created_at)}</div>
      {order.completed_at && (
        <div>Завершён: {formatDateTimeRu(order.completed_at)}</div>
      )}
      <div>Сумма: {order.total_price} ₽</div>
      <div>Режим: {order.mode === "delivery" ? "Доставка" : "В ресторане"}</div>
      {order.address && <div>Адрес: {order.address}</div>}
      {order.comment && <div>Комментарий: {order.comment}</div>}

      <h2>Состав заказа</h2>
      <ul>
        {order.items.map((item) => (
          <li key={item.id}>
            {item.product_name} ×{item.quantity} — {item.product_price} ₽
          </li>
        ))}
      </ul>
    </div>
  );
}
