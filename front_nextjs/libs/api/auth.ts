import { apiFetch } from "./apiFetch";

type TelegramLoginResponse = {
  session_id: string;
  bot_link: string;
};

type TelegramLoginRequest = {
  phone: string;
};

type TelegramSessionRequest = {
  session_id: string;
};

export async function telegramLoginStart(
  phone: string,
): Promise<TelegramLoginResponse> {
  const formattedPhone = "+7" + phone.replace(/\D/g, "").substring(1, 11);

  const res = await apiFetch("/auth/start", {
    method: "POST",
    body: JSON.stringify({ phone: formattedPhone } as TelegramLoginRequest),
    auth: false,
  });

  if (!res.ok) {
    throw new Error("Ошибка сети");
  }

  const data = await res.json();
  return data;
}

export async function telegramLoginFinish(session_id: string): Promise<string> {
  const res = await apiFetch("/auth/finish", {
    method: "POST",
    body: JSON.stringify({ session_id } as TelegramSessionRequest),
    auth: false,
  });

  if (!res.ok) {
    throw new Error("Ошибка сети");
  }

  const data = await res.json();
  return data.token;
}
