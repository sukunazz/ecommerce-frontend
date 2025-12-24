"use client";

import { useParams, useRouter } from "next/navigation";
import { useProduct } from "@/hooks/product/useProductById";
import { useCart } from "@/context/cart/CartContext";
import { useAuthContext } from "@/context/authContext/AuthContext";
import { Card } from "@/components/ui/Card/ProductCard";
import { Skeleton } from "@/components/ui/skeleton/Skeleton";
import { useToast } from "@/context/toast/ToastContext";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const productId = Number(id);

  const { isAuthenticated } = useAuthContext();
  const { product, loading, error } = useProduct(productId);
  const { addToCart } = useCart();
  const toast = useToast();

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.info("Please login to add items to the cart");
      router.push("/auth/login");
      return;
    }

    try {
      await addToCart(product!.id, 1);
      toast.success("Item added to cart");
    } catch (err: any) {
      toast.error(err.message || "Unable to add item to cart");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 max-w-2xl  px-6 py-10">
        {loading ? (
          <div className="space-y-6">
            <Skeleton height="40px" width="60%" />
            <Skeleton height="20px" width="100%" />
            <Skeleton height="20px" width="90%" />
            <Skeleton height="40px" width="30%" />
            <Skeleton height="200px" width="100%" />
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : !product ? (
          <p>Product not found</p>
        ) : (
          <Card>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-400 mb-6">{product.description}</p>
            <p className="text-2xl font-semibold mb-6">${product.price}</p>
            <button
              onClick={handleAddToCart}
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Add to Cart
            </button>
          </Card>
        )}
      </main>
    </div>
  );
}
