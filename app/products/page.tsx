"use client";

import { useProducts } from "@/hooks/product/useProduct";
import Link from "next/link";
import { useCart } from "@/hooks/cart/useCart";

export default function ProductsPage() {
  const { products, loading, error } = useProducts();
  const { addToCart } = useCart();

  if (loading) return <p className="p-6">Loading products...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="border p-4 rounded hover:shadow flex flex-col justify-between"
        >
          {/* Clickable product info */}
          <Link href={`/products/${product.id}`} className="space-y-2">
            <h2 className="font-semibold">{product.name}</h2>
            <p className="text-sm text-gray-600">${product.price}</p>
          </Link>

          {/* Action button (NOT inside Link) */}
          <button
            onClick={() => addToCart(product.id, 1)}
            className="mt-4 bg-black text-white py-2 rounded hover:bg-gray-800"
          >
            Add to cart
          </button>
        </div>
      ))}
    </div>
  );
}
