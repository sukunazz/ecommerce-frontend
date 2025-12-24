"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useProducts } from "@/hooks/product/useProduct";
import { useCart } from "@/context/cart/CartContext";
import { useAuthContext } from "@/context/authContext/AuthContext";
import { Card } from "@/components/ui/Card/ProductCard";
import { Skeleton } from "@/components/ui/skeleton/Skeleton";
import { useToast } from "@/context/toast/ToastContext";

export default function ProductsPage() {
  const router = useRouter();
  const { products, loading, error } = useProducts();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuthContext();
  const toast = useToast();

  const handleAddToCart = async (productId: number) => {
    if (!isAuthenticated) {
      toast.info("Please login to add items to the cart");
      router.push("/auth/login");
      return;
    }
    try {
      await addToCart(productId, 1);
      toast.success("Item added to cart");
    } catch (err: any) {
      toast.error(err.message || "Unable to add item to cart");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main content */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-8">Products</h1>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, idx) => (
              <div key={idx} className="space-y-2">
                <Skeleton height="150px" width="100%" />
                <Skeleton height="20px" width="80%" />
                <Skeleton height="20px" width="60%" />
                <Skeleton height="35px" width="100%" />
              </div>
            ))}
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="flex flex-col">
                <Link href={`/products/${product.id}`} className="mb-4">
                  <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
                  <p className="text-sm text-gray-400">${product.price}</p>
                </Link>

                <button
                  onClick={() => handleAddToCart(product.id)}
                  className="mt-auto w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
                >
                  Add to cart
                </button>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Footer stays at bottom */}
      <footer className="bg-gray-900 text-gray-200 py-10 mt-auto">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">Booksville</h3>
            <p className="text-sm text-gray-400">
              Discover books with our modern and easy-to-use platform.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Links</h3>
            <ul className="space-y-2 text-sm">
              <li>Home</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
            <p className="text-sm text-gray-400">
              Instagram • Facebook • Twitter
            </p>
          </div>
        </div>

        <div className="text-center text-gray-500 text-xs mt-10">
          © 2025 Booksville. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
