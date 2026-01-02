"use client";

import { useState } from "react";
import Image from "next/image";
import { useProducts } from "@/hooks/product/useProduct";
import { ProductSort } from "@/lib/products/types/types";

interface ProductsGridProps {
  title?: string;
  initialLimit?: number;
}

export default function ProductsGrid({
  title,
  initialLimit = 9,
}: ProductsGridProps) {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<ProductSort>("newest");

  const { products, loading, error, meta } = useProducts({
    page,
    limit: initialLimit, // backend will cap this to 3
    sort,
  });

  const totalPages = meta?.totalPages ?? 1;

  return (
    <section className="min-h-screen w-full flex md:flex-col justify-between  bg-gray-50 mx-auto px-6 py-10 space-y-6">
      {/* Title */}
      {title && <h2 className="text-2xl font-bold text-gray-900">{title}</h2>}

      {/* Sort */}
      <div className="flex justify-end">
        <select
          value={sort}
          onChange={(e) => {
            setPage(1); // 🔑 reset page on sort change
            setSort(e.target.value as ProductSort);
          }}
          className="border rounded-lg px-4 py-2 bg-white text-gray-900"
        >
          <option value="newest">Newest</option>
          <option value="price_asc">Price: Low → High</option>
          <option value="price_desc">Price: High → Low</option>
        </select>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-500">Loading products...</p>
      )}

      {/* Error */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Products */}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg p-4 shadow-sm hover:shadow-md transition bg-white"
              >
                <Image
                  src={product.image || "/placeholder.png"}
                  alt={product.name}
                  width={400}
                  height={300}
                  className="h-48 w-full object-cover rounded"
                />

                <h3 className="mt-3 font-semibold text-gray-900">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-600 line-clamp-2">
                  {product.description}
                </p>

                <p className="mt-2 font-bold text-gray-900">${product.price}</p>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-6 mt-10">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-4 py-2 border rounded disabled:opacity-40"
              >
                Previous
              </button>

              <span className="text-sm text-gray-700">
                Page <strong>{page}</strong> of <strong>{totalPages}</strong>
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-4 py-2 border rounded disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
