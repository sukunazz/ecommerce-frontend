import { apiFetch } from "../api";
import { ProductFilters, PaginatedProducts, Product } from "./types/types";

export const ProductApi = {
  async getProducts(filters: ProductFilters = {}): Promise<PaginatedProducts> {
    const params = new URLSearchParams();

    if (filters.search) params.append("search", filters.search);
    if (filters.minPrice !== undefined)
      params.append("minPrice", String(filters.minPrice));
    if (filters.maxPrice !== undefined)
      params.append("maxPrice", String(filters.maxPrice));
    if (filters.sort) params.append("sort", filters.sort);
    if (filters.page) params.append("page", String(filters.page));
    if (filters.limit) params.append("limit", String(filters.limit));

    const query = params.toString();

    return apiFetch(`/products${query ? `?${query}` : ""}`);
  },

  async getProductById(id: number): Promise<Product> {
    return apiFetch(`/products/${id}`);
  },
};
