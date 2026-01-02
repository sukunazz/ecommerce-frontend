"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useProducts } from "@/hooks/product/useProduct";
import { useCart } from "@/context/cart/CartContext";
import { useAuthContext } from "@/context/authContext/AuthContext";
import { Card } from "@/components/ui/Card/ProductCard";
import { Skeleton } from "@/components/ui/skeleton/Skeleton";
import { useToast } from "@/context/toast/ToastContext";
import { useState } from "react";

/* ⭐ Rating Component */
function RatingStars({
  rating = 0,
  count = 0,
}: {
  rating?: number;
  count?: number;
}) {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;

  return (
    <div className="flex items-center gap-1 text-sm">
      <div className="flex text-yellow-400">
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`}>★</span>
        ))}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className="text-gray-300">
            ★
          </span>
        ))}
      </div>
      <span className="text-gray-500 text-xs">({count})</span>
    </div>
  );
}

export default function ProductsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const toast = useToast();

  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") as
    | "price_asc"
    | "price_desc"
    | undefined;

  const [localSearch, setLocalSearch] = useState(search);

  const { products, loading, error } = useProducts({ search, sort });

  const { addToCart } = useCart();
  const { isAuthenticated } = useAuthContext();

  function applySearch() {
    const params = new URLSearchParams(searchParams.toString());
    if (localSearch.trim()) params.set("search", localSearch.trim());
    else params.delete("search");
    router.push(`/products?${params.toString()}`);
  }

  function updateSort(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set("sort", value);
    else params.delete("sort");
    router.push(`/products?${params.toString()}`);
  }

  async function handleAddToCart(productId: number) {
    if (!isAuthenticated) {
      toast.info("Please login to add items to the cart");
      router.push("/login");
      return;
    }
    try {
      await addToCart(productId, 1);
      toast.success("Item added to cart");
    } catch (err: any) {
      toast.error(err.message || "Unable to add item to cart");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center space-y-6 px-6">
        {[...Array(6)].map((_, idx) => (
          <Skeleton key={idx} height="250px" width="300px" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="grow w-full px-6 lg:px-10 py-10">
        <h1 className="text-3xl font-bold mb-6">Products</h1>

        {/* SEARCH + SORT */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search products..."
            className="border rounded-lg px-4 py-2 w-full sm:w-1/2"
          />
          <button
            onClick={applySearch}
            className="px-4 py-2 rounded-lg bg-black text-white"
          >
            Search
          </button>
          <select
            value={sort || ""}
            onChange={(e) => updateSort(e.target.value)}
            className="border rounded-lg px-4 py-2 sm:ml-auto"
          >
            <option value="">Sort by</option>
            <option value="price_asc">Price: Low → High</option>
            <option value="price_desc">Price: High → Low</option>
          </select>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <div className="flex flex-wrap gap-6">
          {products.map((product) => (
            <Card key={product.id} className="w-72 flex flex-col">
              {/* IMAGE */}
              <Link href={`/products/${product.id}`}>
                <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden bg-gray-100">
                  <Image
                    src={product.image || "/placeholder.png"}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </Link>

              {/* INFO */}
              <Link href={`/products/${product.id}`} className="space-y-1">
                <h2 className="text-lg font-semibold">{product.name}</h2>

                <RatingStars
                  rating={product.averageRating || 0}
                  count={product.reviewCount || 0}
                />

                <p className="text-lg font-bold mt-1">
                  ${product.price.toFixed(2)}
                </p>
              </Link>

              {/* ACTION */}
              <button
                onClick={() => handleAddToCart(product.id)}
                className="mt-auto w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
              >
                Add to cart
              </button>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
