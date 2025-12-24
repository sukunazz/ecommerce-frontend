"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/cart/CartContext";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton/Skeleton";
import { useToast } from "@/context/toast/ToastContext";

export default function CartPage() {
  const { items, total, loading, error, updateQuantity, removeItem } =
    useCart();
  const [selected, setSelected] = useState<number[]>([]);
  const router = useRouter();
  const toast = useToast();

  const toggle = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const goToCheckout = () => {
    if (selected.length === 0) {
      toast.error("Select at least one item");
      return;
    }
    router.push(`/checkout?items=${selected.join(",")}`);
  };

  if (loading) {
    return (
      <div className="p-6 max-w-4xl mx-auto space-y-4">
        {Array(3)
          .fill(0)
          .map((_, idx) => (
            <Skeleton key={idx} height="80px" />
          ))}
      </div>
    );
  }

  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🛒 Your Cart</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border rounded-lg p-4"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={selected.includes(item.id)}
                onChange={() => toggle(item.id)}
              />

              <div>
                <h2 className="font-semibold">{item.product.name}</h2>
                <p className="text-sm text-gray-500">
                  ${item.product.price} × {item.quantity}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.id, Number(e.target.value))
                }
                className="w-16 border rounded px-2 py-1"
              />
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between items-center">
        <p className="text-xl font-semibold">Total: ${total}</p>
        <button
          onClick={goToCheckout}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
        >
          Checkout
        </button>
      </div>

      <div className="mt-4">
        <Link href="/products" className="underline text-sm">
          ← Continue shopping
        </Link>
      </div>
    </div>
  );
}
