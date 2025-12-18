import { apiFetch } from "../api";
import { Product } from "./types/types";

export const ProductApi = {
  getProducts(): Promise<Product[]> {
    return apiFetch("/products");
  },

  getProductById(id: number): Promise<Product> {
    return apiFetch(`/products/${id}`);
  },
};
