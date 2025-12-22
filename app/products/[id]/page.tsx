"use client";

import { useParams } from "next/navigation";
import { useProduct } from "@/hooks/product/useProductById";
import { useCart } from "@/hooks/cart/useCart";
import router from "next/router";
import { useAuthContext } from "@/context/authContext/AuthContext";

export default function ProductDetailsPage() {
  const params = useParams();
  const productId = Number(params.id);
  const isAuthenticated = useAuthContext();
  const { product, loading, error } = useProduct(productId);
  const { addToCart } = useCart();

  if (loading) return <p className="p-6">Loading product...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!product) return <p className="p-6">Product not found</p>;

  const handleAddToCart = async (productId: number) => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    await addToCart(productId, 1);
  };
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="mt-2 text-gray-700">{product.description}</p>
      <p className="mt-4 font-semibold">${product.price}</p>

      <button
        onClick={() => handleAddToCart(product.id)}
        className="mt-6 bg-black text-white px-6 py-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}
