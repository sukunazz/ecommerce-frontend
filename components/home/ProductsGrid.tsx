"use client";

import { useState } from "react";
import Image from "next/image";
import { useProducts } from "@/hooks/product/useProduct";
import { ProductSort } from "@/lib/products/types/types";

export default function ProductsGrid() {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<ProductSort>("newest");

  const { products, loading, error, totalPages } = useProducts({
    page,
    limit: 9,
    sort,
  });

  if (loading) {
    return <p className="text-center">Loading products...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="space-y-6">
      {/* Sort */}
      <div className="flex justify-end">
        <select
          value={sort}
          onChange={(e) => {
            setPage(1);
            setSort(e.target.value as ProductSort);
          }}
          className="border rounded px-3 py-2"
        >
          <option value="newest">Newest</option>
          <option value="price_asc">Price: Low → High</option>
          <option value="price_desc">Price: High → Low</option>
        </select>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            <Image
              src={product.image || "/placeholder.png"}
              alt={product.name}
              width={400}
              height={300}
              className="h-48 w-full object-cover rounded"
            />

            <h3 className="mt-2 font-semibold">{product.name}</h3>

            <p className="text-sm text-gray-600 line-clamp-2">
              {product.description}
            </p>

            <p className="mt-1 font-bold">${product.price}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="self-center">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
