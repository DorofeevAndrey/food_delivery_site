import { apiFetch } from "./apiFetch";

export type NotificationDto = {
  id: number;
  title: string;
  text: string;
  created_at: string;
  is_read: boolean;
  order_id?: number | null;
};

export async function getNotifications(): Promise<NotificationDto[]> {
  const res = await apiFetch("/notifications", { method: "GET" });
  return res.json();
}

export async function markNotificationRead(
  id: number,
): Promise<NotificationDto> {
  const res = await apiFetch(`/notifications/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ is_read: true }),
  });
  return res.json();
}
