export type ProfileResponse = {
  id: number;
  phone: string;
  telegram_id: string;
  first_name: string;
  date_of_birth: Date;
  email: string;
  gender: string;
};

export type ProfileUpdateRequest = {
  first_name: string;
  date_of_birth: string;
  email: string;
  gender: string;
};

export type PutProfileRequest = {};

export async function getProfile(token: string): Promise<ProfileResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const response = await fetch(`${baseUrl}/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export async function patchProfile(
  user_id: number,
  token: string,
  patchUserData: ProfileUpdateRequest
): Promise<ProfileResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const response = await fetch(`${baseUrl}/profile/${user_id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(patchUserData),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export async function deleteProfile(
  token: string,
  user_id: number
): Promise<boolean> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const response = await fetch(`${baseUrl}/profile/delete/${user_id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return true;
}
