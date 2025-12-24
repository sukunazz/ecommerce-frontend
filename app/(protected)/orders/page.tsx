"use client";

import { useOrders } from "@/hooks/orders/useOrder";
import { Skeleton } from "@/components/ui/skeleton/Skeleton";
import { useToast } from "@/context/toast/ToastContext";

export default function OrdersPage() {
  const { orders, loading, cancelOrder } = useOrders();
  const toast = useToast();

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-4">
        {Array(3)
          .fill(0)
          .map((_, idx) => (
            <Skeleton key={idx} height="100px" />
          ))}
      </div>
    );
  }

  if (!orders.length) return <p className="p-6">No orders found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {orders.map((order) => (
        <div key={order.id} className="border p-4 rounded-lg space-y-2">
          <p>Order #{order.id}</p>
          <p>Status: {order.status}</p>
          <p>Payment: {order.paymentStatus}</p>
          <p>Total: ${order.total}</p>

          {order.status === "CREATED" && (
            <button
              className="text-red-500 mt-2"
              onClick={() => {
                cancelOrder(order.id);
                toast.success(`Order #${order.id} cancelled`);
              }}
            >
              Cancel Order
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
