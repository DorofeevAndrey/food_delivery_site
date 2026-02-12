import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useUser } from "@/hooks/useUser";
import {
  getAdminOrders,
  updateOrderStatus,
  adminOrderStatuses,
  type AdminOrderStatus,
} from "@/libs/api/adminOrders";
import type { OrderOut } from "@/libs/api/order";

import Button from "@/components/Atoms/Button/Button";
import styles from "./AdminPanel.module.css";
import Dropdown from "@/components/Atoms/DropDown/DropDown";

export default function AdminPanel() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  const [orders, setOrders] = useState<OrderOut[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<AdminOrderStatus | "all">(
    "all",
  );

  useEffect(() => {
    if (isUserLoading) return;

    if (!user || !user.is_admin) {
      router.push("/");
      return;
    }

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const data = await getAdminOrders(
          statusFilter === "all" ? undefined : statusFilter,
        );
        setOrders(data);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, isUserLoading, router, statusFilter]);

  if (isUserLoading) {
    return <div className={styles.center}>Загружаем…</div>;
  }

  if (!user || !user.is_admin) {
    return null;
  }

  return (
    <main className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.title}>Админка: заказы</h1>

        <div className={styles.filters}>
          <span className={styles.filtersLabel}>Статус:</span>

          <Button
            variant="white"
            className={`${styles.filterButton} ${
              statusFilter === "all" ? styles.filterButtonActive : ""
            }`}
            onClick={() => setStatusFilter("all")}
            title="Все"
          />

          {adminOrderStatuses.map((status) => (
            <Button
              key={status}
              variant="white"
              className={`${styles.filterButton} ${
                statusFilter === status ? styles.filterButtonActive : ""
              }`}
              onClick={() => setStatusFilter(status)}
              title={status}
            />
          ))}
        </div>
      </header>

      {loading && <div className={styles.center}>Загружаем заказы…</div>}

      {!loading && orders.length === 0 && (
        <div className={styles.center}>Заказов с таким статусом нет</div>
      )}

      <section className={styles.list}>
        {orders.map((o) => (
          <article key={o.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <div>
                <div className={styles.cardTitle}>
                  Заказ #{o.id} — {o.status}
                </div>
                <div className={styles.cardMeta}>
                  {o.total_price} ₽ ·{" "}
                  {o.mode === "delivery" ? "Доставка" : "Ресторан"}
                </div>
              </div>

              <div className={styles.statusControl}>
                <label className={styles.statusLabel}>Изменить статус</label>
                <Dropdown
                  placeholder="Статус"
                  value={o.status}
                  options={adminOrderStatuses.map((status) => ({
                    value: status,
                    label: status,
                  }))}
                  onChange={async (newStatus) => {
                    const updated = await updateOrderStatus(
                      o.id,
                      newStatus as AdminOrderStatus,
                    );
                    setOrders((prev) =>
                      prev.map((x) => (x.id === o.id ? updated : x)),
                    );
                  }}
                />
              </div>
            </div>

            <ul className={styles.items}>
              {o.items.map((item) => (
                <li key={item.id} className={styles.itemRow}>
                  <span className={styles.itemName}>{item.product_name}</span>
                  <span className={styles.itemQty}>×{item.quantity}</span>
                  <span className={styles.itemPrice}>
                    {item.product_price} ₽
                  </span>
                </li>
              ))}
            </ul>

            {o.address && (
              <div className={styles.address}>Адрес: {o.address}</div>
            )}
            {o.comment && (
              <div className={styles.comment}>Комментарий: {o.comment}</div>
            )}
          </article>
        ))}
      </section>
    </main>
  );
}
