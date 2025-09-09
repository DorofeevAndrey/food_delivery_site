export type ProfileResponse = {
  id: number;
  phone: string;
  telegram_id: string;
  first_name: string;
  date_of_birth: Date;
  email: string;
  gender: string;
};

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
