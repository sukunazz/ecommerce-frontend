import { Product } from "@/lib/products/types/types";

export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}
