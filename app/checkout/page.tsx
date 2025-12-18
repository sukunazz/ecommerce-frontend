"use client";

import { useState } from "react";
import { useCart } from "@/hooks/cart/useCart";
import { OrdersApi } from "@/lib/orders/order";
import { usePayment } from "@/hooks/payments/usePayment";

export default function CheckoutPage() {
  const { items, total } = useCart();
  const { payForOrder } = usePayment();

  const [address, setAddress] = useState("");
  const [coupon, setCoupon] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!address) {
      alert("Address is required");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Create order from cart
      const order = await OrdersApi.checkout(address, coupon || undefined);

      // 2️⃣ Pay with Stripe
      await payForOrder(order.id);
    } catch (err: any) {
      alert(err.message || "Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  if (!items || items.length === 0) {
    return <p className="p-6">Cart is empty</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {items.map((item) => (
        <div key={item.id} className="flex justify-between mb-2">
          <span>
            {item.product.name} × {item.quantity}
          </span>
          <span>${item.product.price * item.quantity}</span>
        </div>
      ))}

      <div className="font-bold mt-4">Total: ${total}</div>

      <input
        className="border p-2 w-full mt-4"
        placeholder="Shipping address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <input
        className="border p-2 w-full mt-2"
        placeholder="Coupon code (optional)"
        value={coupon}
        onChange={(e) => setCoupon(e.target.value)}
      />

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full bg-black text-white py-3 mt-4 rounded"
      >
        {loading ? "Processing..." : "Pay with Stripe"}
      </button>
    </div>
  );
}
