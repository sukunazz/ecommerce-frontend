"use client";
export const dynamic = "force-dynamic";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useProducts } from "@/hooks/product/useProduct";
import { useCart } from "@/context/cart/CartContext";
import { useAuthContext } from "@/context/authContext/AuthContext";
import { Card } from "@/components/ui/Card/ProductCard";
import { Skeleton } from "@/components/ui/skeleton/Skeleton";
import { useToast } from "@/context/toast/ToastContext";

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const toast = useToast();

  // 🔎 READ FROM URL
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") as
    | "price_asc"
    | "price_desc"
    | undefined;

  const { products, loading, error } = useProducts({
    search,
    sort,
  });

  const { addToCart } = useCart();
  const { isAuthenticated } = useAuthContext();

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

  const updateSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set("sort", value);
    else params.delete("sort");

    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="grow max-w-7xl px-6 py-10 mx-auto">
        <h1 className="text-3xl font-bold mb-8">Products</h1>

        {/* SORT */}
        <div className="flex justify-end mb-6">
          <select
            value={sort || ""}
            onChange={(e) => updateSort(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option value="">Sort by</option>
            <option value="price_asc">Price: Low → High</option>
            <option value="price_desc">Price: High → Low</option>
          </select>
        </div>

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
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-sm text-gray-500">${product.price}</p>
                </Link>

                <button
                  onClick={() => handleAddToCart(product.id)}
                  className="mt-auto w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
                >
                  Add to cart
                </button>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
