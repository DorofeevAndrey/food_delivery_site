"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { getAdminOrders, updateOrderStatus } from "@/libs/api/adminOrders";
import type { OrderOut } from "@/libs/api/order";

export default function AdminPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const [orders, setOrders] = useState<OrderOut[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isUserLoading) return;
    if (!user || !user.is_admin) {
      router.push("/"); // или страница 403
      return;
    }

    setLoading(true);
    getAdminOrders()
      .then(setOrders)
      .finally(() => setLoading(false));
  }, [user, isUserLoading, router]);

  if (isUserLoading) return <div>Загружаем…</div>;
  if (!user || !user.is_admin) return null;

  return (
    <main>
      <h1>Админка: заказы</h1>
      {loading && <div>Загружаем заказы…</div>}
      {!loading &&
        orders.map((o) => (
          <div key={o.id}>
            <div>
              Заказ #{o.id} — {o.status} — {o.total_price} ₽
            </div>
            <select
              value={o.status}
              onChange={async (e) => {
                const updated = await updateOrderStatus(
                  o.id,
                  e.target.value as any,
                );
                setOrders((prev) =>
                  prev.map((x) => (x.id === o.id ? updated : x)),
                );
              }}
            >
              <option value="pending">pending</option>
              <option value="confirmed">confirmed</option>
              <option value="completed">completed</option>
              <option value="cancelled">cancelled</option>
            </select>
          </div>
        ))}
    </main>
  );
}
