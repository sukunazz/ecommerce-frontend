import { apiFetch } from "@/lib/api";
import { Cart } from "./types/types";

export const CartApi = {
  getCart(): Promise<Cart> {
    return apiFetch("/cart");
  },

  addCartItem(productId: number, quantity: number): Promise<Cart> {
    return apiFetch("/cart/add", {
      method: "POST",
      body: JSON.stringify({ productId, quantity }),
    });
  },

  updateCartItem(cartItemId: number, quantity: number): Promise<Cart> {
    return apiFetch(`/cart/${cartItemId}`, {
      method: "PATCH",
      body: JSON.stringify({ quantity }),
    });
  },

  deleteCartItem(cartItemId: number): Promise<Cart> {
    return apiFetch(`/cart/${cartItemId}`, {
      method: "DELETE",
    });
  },

  checkout(cartItemIds: number[], address: string, coupon?: string) {
    return apiFetch("/orders/checkout", {
      method: "POST",
      body: JSON.stringify({ cartItemIds, address, coupon }),
    });
  },
};
