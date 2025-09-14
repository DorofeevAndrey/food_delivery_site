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
  phone: string
): Promise<TelegramLoginResponse> {
  const formattedPhone = "+7" + phone.replace(/\D/g, "").substring(1, 11);

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const res = await fetch(`${baseUrl}/auth/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone: formattedPhone } as TelegramLoginRequest),
  });

  if (!res.ok) {
    throw new Error("Ошибка сети");
  }

  const data = await res.json();
  return data;
}

export async function telegramLoginFinish(session_id: string): Promise<string> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res = await fetch(`${baseUrl}/auth/finish`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id: session_id } as TelegramSessionRequest),
  });

  if (!res.ok) {
    throw new Error("Ошибка сети");
  }

  const token = await res.json();
  return token.token;
}
