import { apiFetch } from "./apiFetch";

export type ProfileResponse = {
  id: number;
  phone: string;
  telegram_id: string;
  first_name: string;
  date_of_birth: string;
  email: string;
  gender: string;
  is_admin: boolean;
};

export type ProfileUpdateRequest = {
  first_name: string;
  date_of_birth: string;
  email: string;
  gender: string;
};

export async function getProfile(): Promise<ProfileResponse> {
  const res = await apiFetch("/profile", { method: "GET" });
  return res.json();
}

export async function patchProfile(
  user_id: number,
  patchUserData: ProfileUpdateRequest,
): Promise<ProfileResponse> {
  const res = await apiFetch(`/profile/${user_id}`, {
    method: "PATCH",
    body: JSON.stringify(patchUserData),
  });
  return res.json();
}

export async function deleteProfile(user_id: number): Promise<boolean> {
  await apiFetch(`/profile/delete/${user_id}`, {
    method: "DELETE",
  });
  return true;
}
