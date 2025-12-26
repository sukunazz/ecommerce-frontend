import { apiFetch } from "../api";
import { Product } from "./types/types";

export interface ProductFilters {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
}

export const ProductApi = {
  getProducts(filters?: ProductFilters): Promise<Product[]> {
    const params = new URLSearchParams();

    if (filters?.search) params.append("search", filters.search);
    if (filters?.minPrice !== undefined)
      params.append("minPrice", String(filters.minPrice));
    if (filters?.maxPrice !== undefined)
      params.append("maxPrice", String(filters.maxPrice));

    const query = params.toString();
    return apiFetch(`/products${query ? `?${query}` : ""}`);
  },

  getProductById(id: number): Promise<Product> {
    return apiFetch(`/products/${id}`);
  },
};
