import Cookies from "js-cookie";

const getBaseUrl = () => process.env.NEXT_PUBLIC_API_BASE_URL;

export async function apiFetch(
  path: string,
  options: RequestInit & { auth?: boolean } = {},
) {
  const { auth = true, ...fetchOptions } = options;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(fetchOptions.headers as Record<string, string>),
  };
  if (auth) {
    const token = Cookies.get("auth_token");
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }
  const url = `${getBaseUrl()}${path}`;
  const res = await fetch(url, { ...fetchOptions, headers });
  if (!res.ok) throw new Error(`Error: ${res.status}`);
  return res;
}
