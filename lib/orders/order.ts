import { apiFetch } from "@/lib/api";
import { Order } from "./types/types";

export const OrdersApi = {
  checkout(address: string, coupon?: string): Promise<Order> {
    return apiFetch("/orders/checkout", {
      method: "POST",
      body: JSON.stringify({ address, coupon }),
    });
  },

  history(): Promise<Order[]> {
    return apiFetch("/orders/history");
  },

  cancel(orderId: number): Promise<Order> {
    return apiFetch(`/orders/${orderId}/cancel`, {
      method: "POST",
    });
  },
};
