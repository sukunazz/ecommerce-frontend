import { apiFetch } from "@/lib/api";

export const PaymentsApi = {
  pay(orderId: number): Promise<{ checkoutUrl: string }> {
    return apiFetch(`/payments/pay/${orderId}`, {
      method: "POST",
    });
  },
};
