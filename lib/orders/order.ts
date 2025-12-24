import { apiFetch } from "@/lib/api";
import { Order } from "./types/types";

export const OrdersApi = {
  /**
   * ✅ Create order from selected cart items
   */
  checkout(data: {
    address: string;
    cartItemIds: number[];
    coupon?: string;
  }): Promise<Order> {
    return apiFetch("/orders/checkout", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  /**
   * ✅ Order history (unchanged)
   */
  history(): Promise<Order[]> {
    return apiFetch("/orders/history");
  },

  /**
   * ✅ Cancel order (unchanged)
   */
  cancel(orderId: number): Promise<Order> {
    return apiFetch(`/orders/${orderId}/cancel`, {
      method: "POST",
    });
  },
};
