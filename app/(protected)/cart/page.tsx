"use client";

import Link from "next/link";
import { useCart } from "@/hooks/cart/useCart";

export default function CartPage() {
  const { items, total, loading, error, updateQuantity, removeItem } =
    useCart();

  if (loading) return <p className="p-6">Loading cart...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  if (items.length === 0) {
    return (
      <div className="p-6">
        <p>Your cart is empty.</p>
        <Link href="/products" className="underline">
          Go shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border p-4 rounded"
          >
            <div>
              <h2 className="font-semibold">{item.product.name}</h2>
              <p className="text-sm text-gray-600">
                ${item.product.price} × {item.quantity}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.id, Number(e.target.value))
                }
                className="w-16 border px-2 py-1"
              />

              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <p className="text-xl font-semibold">Total: ${total}</p>
        <Link
          href="/checkout"
          className="bg-black text-white px-6 py-2 rounded"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}
