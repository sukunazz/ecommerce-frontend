"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useProducts } from "@/hooks/product/useProduct";
import { useCart } from "@/hooks/cart/useCart";
import { useAuthContext } from "@/context/authContext/AuthContext";

export default function ProductsPage() {
  const router = useRouter();

  const { products, loading, error } = useProducts();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuthContext();

  if (loading) return <p className="p-6">Loading products...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  const handleAddToCart = async (productId: number) => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    await addToCart(productId, 1);
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="border p-4 rounded hover:shadow flex flex-col justify-between"
        >
          {/* Product info (navigates) */}
          <Link href={`/products/${product.id}`} className="space-y-2">
            <h2 className="font-semibold">{product.name}</h2>
            <p className="text-sm text-gray-600">${product.price}</p>
          </Link>

          {/* Action button (protected) */}
          <button
            onClick={() => handleAddToCart(product.id)}
            className="mt-4 bg-black text-white py-2 rounded hover:bg-gray-800"
          >
            Add to cart
          </button>
        </div>
      ))}
    </div>
  );
}
