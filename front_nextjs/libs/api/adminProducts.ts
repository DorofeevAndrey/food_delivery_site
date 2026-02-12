import { apiFetch } from "./apiFetch";
import type { ProductDto } from "./product";

export type ProductAdminCreatePayload = {
  name: string;
  description?: string | null;
  price: string;
  weight: string;
  image_url?: string | null;
  is_active?: boolean;
};

export type ProductAdminUpdatePayload = Partial<ProductAdminCreatePayload>;

export async function getAllProductsAdmin(): Promise<ProductDto[]> {
  const res = await apiFetch("/products/all");
  return res.json();
}

export async function createProductAdmin(
  payload: ProductAdminCreatePayload,
): Promise<ProductDto> {
  const res = await apiFetch("/products", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function updateProductAdmin(
  id: number,
  payload: ProductAdminUpdatePayload,
): Promise<ProductDto> {
  const res = await apiFetch(`/products/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function deleteProductAdmin(id: number): Promise<void> {
  await apiFetch(`/products/${id}`, {
    method: "DELETE",
  });
}

export async function uploadProductImageAdmin(
  id: number,
  file: File,
): Promise<ProductDto> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await apiFetch(`/products/${id}/image`, {
    method: "POST",
    body: formData,
  });
  return res.json();
}

