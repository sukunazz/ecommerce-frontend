import { CartItem } from "./cartItem.types";

export interface Cart {
  id: number | null;
  items: CartItem[];
}
