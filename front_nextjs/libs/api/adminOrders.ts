// front_nextjs/libs/api/adminOrders.ts
import { apiFetch } from "./apiFetch";
import type { OrderOut } from "./order";

export const adminOrderStatuses = [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
] as const;

export type AdminOrderStatus = (typeof adminOrderStatuses)[number];

export async function getAdminOrders(
  status?: AdminOrderStatus,
): Promise<OrderOut[]> {
  const params = status ? `?status_filter=${status}` : "";
  const res = await apiFetch(`/admin/orders${params}`, { method: "GET" });
  return res.json();
}

export async function updateOrderStatus(
  orderId: number,
  status: AdminOrderStatus,
): Promise<OrderOut> {
  const res = await apiFetch(`/admin/orders/${orderId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
  return res.json();
}
