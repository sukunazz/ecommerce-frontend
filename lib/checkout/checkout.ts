import { apiFetch } from "@/lib/api";

export const CheckoutApi = {
  createSession() {
    return apiFetch("/checkout/session", {
      method: "POST",
    });
  },
};
