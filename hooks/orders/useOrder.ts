"use client";

import { useEffect, useState } from "react";
import { OrdersApi } from "@/lib/orders/order";
import { Order } from "@/lib/orders/types/types";

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await OrdersApi.history();
      setOrders(data);
    } catch (err: any) {
      setError(err.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId: number) => {
    const updated = await OrdersApi.cancel(orderId);
    setOrders((prev) => prev.map((o) => (o.id === orderId ? updated : o)));
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return {
    orders,
    loading,
    error,
    cancelOrder,
    reload: loadOrders,
  };
}
