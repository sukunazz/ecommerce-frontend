"use client";

import { PaymentsApi } from "@/lib/payments/payment";

export function usePayment() {
  const payForOrder = async (orderId: number) => {
    const { checkoutUrl } = await PaymentsApi.pay(orderId);
    window.location.href = checkoutUrl;
  };

  return { payForOrder };
}
