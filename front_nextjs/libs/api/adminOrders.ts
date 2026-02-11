import { apiFetch } from "./apiFetch";
import type { OrderOut } from "./order";

export async function getAdminOrders(status?: string): Promise<OrderOut[]> {
  const params = status ? `?status_filter=${status}` : "";
  const res = await apiFetch(`/admin/orders${params}`, { method: "GET" });
  return res.json();
}

export async function updateOrderStatus(
  orderId: number,
  status: "pending" | "confirmed" | "completed" | "cancelled",
): Promise<OrderOut> {
  const res = await apiFetch(`/admin/orders/${orderId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
  return res.json();
}
