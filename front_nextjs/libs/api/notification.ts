export type NotificationDto = {
  id: number;
  title: string;
  text: string;
  created_at: string;
  is_read: boolean;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export async function getNotifications(token: string): Promise<NotificationDto[]> {
  const res = await fetch(`${API_URL}/notifications`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch notifications");
  }

  return res.json();
}

export async function markNotificationRead(
  token: string,
  id: number,
  isRead: boolean = true
): Promise<NotificationDto> {
  const res = await fetch(`${API_URL}/notifications/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ is_read: isRead }),
  });

  if (!res.ok) {
    throw new Error("Failed to update notification");
  }

  return res.json();
}