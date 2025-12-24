"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/context/cart/CartContext";
import { OrdersApi } from "@/lib/orders/order";
import { usePayment } from "@/hooks/payments/usePayment";

export default function CheckoutPage() {
  const { items, total } = useCart();
  const { payForOrder } = usePayment();
  const searchParams = useSearchParams();

  const [address, setAddress] = useState("");
  const [coupon, setCoupon] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Get selected cart item IDs from URL
  const cartItemIds = useMemo(() => {
    const raw = searchParams.get("items");
    return raw ? raw.split(",").map(Number) : [];
  }, [searchParams]);

  const selectedItems = items.filter((i) => cartItemIds.includes(i.id));

  const handleCheckout = async () => {
    if (!address) {
      alert("Address is required");
      return;
    }

    if (cartItemIds.length === 0) {
      alert("No items selected");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Create order
      const order = await OrdersApi.checkout({
        address,
        cartItemIds,
        coupon: coupon || undefined,
      });

      // 2️⃣ Redirect to Stripe
      await payForOrder(order.id);
    } catch (err: any) {
      alert(err.message || "Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  if (selectedItems.length === 0) {
    return <p className="p-6">No items selected</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {selectedItems.map((item) => (
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
