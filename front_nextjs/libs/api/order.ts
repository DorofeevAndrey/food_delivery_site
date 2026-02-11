import { apiFetch } from "./apiFetch";

export type OrderMode = "delivery" | "restaurant";

export type OrderItemCreate = {
  product_id: number;
  quantity: number;
};

export type OrderCreateRequest = {
  mode: OrderMode;
  items: OrderItemCreate[];
  address?: string | null;
  comment?: string | null;
};

export type OrderItemOut = {
  id: number;
  product_id: number;
  product_name: string;
  product_price: string;
  quantity: number;
};

export type OrderOut = {
  id: number;
  mode: OrderMode;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  total_price: string;
  address?: string | null;
  comment?: string | null;
  items: OrderItemOut[];
};

export async function createOrder(
  payload: OrderCreateRequest,
): Promise<OrderOut> {
  const res = await apiFetch("/orders", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function getOrders(): Promise<OrderOut[]> {
  const res = await apiFetch("/orders", { method: "GET" });
  return res.json();
}
