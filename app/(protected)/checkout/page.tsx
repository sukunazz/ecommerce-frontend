"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/context/cart/CartContext";
import { OrdersApi } from "@/lib/orders/order";
import { usePayment } from "@/hooks/payments/usePayment";
import { checkoutSchema } from "@/lib/validation/checkout.schema";
import { useToast } from "@/context/toast/ToastContext";
import { Skeleton } from "@/components/ui/skeleton/Skeleton";

export default function CheckoutPage() {
  const { items, total } = useCart();
  const { payForOrder } = usePayment();
  const searchParams = useSearchParams();
  const toast = useToast();

  const [address, setAddress] = useState("");
  const [coupon, setCoupon] = useState("");
  const [loading, setLoading] = useState(false);

  const cartItemIds = useMemo(() => {
    const raw = searchParams.get("items");
    return raw ? raw.split(",").map(Number) : [];
  }, [searchParams]);

  const selectedItems = items.filter((i) => cartItemIds.includes(i.id));

  const handleCheckout = async () => {
    const validation = checkoutSchema.safeParse({
      address,
      cartItemIds,
      coupon: coupon || undefined,
    });

    if (!validation.success) {
      toast.error(validation.error.issues[0].message);
      return;
    }

    try {
      setLoading(true);
      const order = await OrdersApi.checkout({
        address,
        cartItemIds,
        coupon: coupon || undefined,
      });
      await payForOrder(order.id);
      toast.success("Checkout successful!");
    } catch (err: any) {
      toast.error(err.message || "Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  if (selectedItems.length === 0)
    return <p className="p-6">No items selected</p>;

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-6 space-y-4">
        {Array(selectedItems.length)
          .fill(0)
          .map((_, idx) => (
            <Skeleton key={idx} height="40px" />
          ))}
        <Skeleton height="50px" />
        <Skeleton height="40px" />
      </div>
    );
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
        className="border p-2 w-full mt-4 rounded"
        placeholder="Shipping address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <input
        className="border p-2 w-full mt-2 rounded"
        placeholder="Coupon code (optional)"
        value={coupon}
        onChange={(e) => setCoupon(e.target.value)}
      />

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full bg-black text-white py-3 mt-4 rounded disabled:opacity-60"
      >
        {loading ? <Skeleton height="100%" /> : "Pay with Stripe"}
      </button>
    </div>
  );
}
