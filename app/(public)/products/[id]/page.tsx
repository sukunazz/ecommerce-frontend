"use client";

import { useParams, useRouter } from "next/navigation";
import { useProduct } from "@/hooks/product/useProductById";
import { useCart } from "@/hooks/cart/useCart";
import { useAuthContext } from "@/context/authContext/AuthContext";
import { Card } from "@/components/ui/Card/ProductCard";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const productId = Number(id);

  const { isAuthenticated } = useAuthContext();
  const { product, loading, error } = useProduct(productId);
  const { addToCart } = useCart();

  if (loading) return <p className="p-6">Loading product...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!product) return <p className="p-6">Product not found</p>;

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    await addToCart(product.id, 1);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <Card>
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

        <p className="text-gray-400 mb-6">{product.description}</p>

        <p className="text-2xl font-semibold mb-6">${product.price}</p>

        <button
          onClick={handleAddToCart}
          className="
            w-full bg-black text-white
            py-3 rounded-lg
            hover:bg-gray-800
            transition
          "
        >
          Add to Cart
        </button>
      </Card>
    </div>
  );
}
