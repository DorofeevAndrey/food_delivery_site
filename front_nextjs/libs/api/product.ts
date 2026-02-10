import { apiFetch } from "./apiFetch";

export type ProductDto = {
  id: number;
  name: string;
  description?: string | null;
  price: string;
  weight: string;
  image_url?: string | null;
};

export async function getProducts(): Promise<ProductDto[]> {
  const res = await apiFetch("/products");
  return res.json();
}
