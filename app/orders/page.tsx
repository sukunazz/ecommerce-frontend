"use client";

import { useOrders } from "@/hooks/orders/useOrder";

export default function OrdersPage() {
  const { orders, loading, cancelOrder } = useOrders();

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {orders.map((order) => (
        <div key={order.id} className="border p-4 mb-4">
          <p>Order #{order.id}</p>
          <p>Status: {order.status}</p>
          <p>Payment: {order.paymentStatus}</p>
          <p>Total: ${order.total}</p>

          {order.status === "CREATED" && (
            <button
              className="text-red-500 mt-2"
              onClick={() => cancelOrder(order.id)}
            >
              Cancel Order
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
