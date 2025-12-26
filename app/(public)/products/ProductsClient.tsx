"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useProducts } from "@/hooks/product/useProduct";
import { useCart } from "@/context/cart/CartContext";
import { useAuthContext } from "@/context/authContext/AuthContext";
import { Card } from "@/components/ui/Card/ProductCard";
import { Skeleton } from "@/components/ui/skeleton/Skeleton";
import { useToast } from "@/context/toast/ToastContext";
import { useState, useEffect } from "react";

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

  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  const { products, loading, error } = useProducts({ search, sort });
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuthContext();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    if (localSearch) params.set("search", localSearch);
    else params.delete("search");

    router.push(`/products?${params.toString()}`);
  };

  return (
    <main className="max-w-7xl px-6 py-10 mx-auto">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      {/* 🔍 Products Search */}
      <form onSubmit={handleSearchSubmit} className="mb-6">
        <input
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full md:w-1/2 px-4 py-2 border rounded-lg"
        />
      </form>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} height="200px" />
          ))}
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="flex flex-col">
              <Link href={`/products/${product.id}`}>
                <h2 className="font-semibold">{product.name}</h2>
                <p>${product.price}</p>
              </Link>

              <button
                onClick={() => addToCart(product.id, 1)}
                className="mt-auto bg-black text-white py-2 rounded-lg"
              >
                Add to cart
              </button>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
