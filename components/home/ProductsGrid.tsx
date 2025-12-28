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
    limit: initialLimit,
    sort,
  });

  const totalPages = meta?.totalPages ?? 1;

  return (
    <section className="max-w-7xl mx-auto px-6 py-10 space-y-6">
      {/* Title */}
      {title && <h2 className="text-2xl font-bold text-gray-900">{title}</h2>}

      {/* Sort (hide on home if needed later) */}
      <div className="flex justify-end">
        <select
          value={sort}
          onChange={(e) => {
            setPage(1);
            setSort(e.target.value as ProductSort);
          }}
          className="border rounded-lg px-4 py-2"
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

              <h3 className="mt-3 font-semibold">{product.name}</h3>

              <p className="text-sm text-gray-600 line-clamp-2">
                {product.description}
              </p>

              <p className="mt-2 font-bold">${product.price}</p>
            </div>
          ))}
        </div>
      )}

      {/* Pagination (hide if single page) */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span>
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
      )}
    </section>
  );
}
