"use client";

import { useEffect, useState } from "react";
import { ProductApi } from "@/lib/products/product";
import { Product, ProductFilters } from "@/lib/products/types/types";

export function useProducts(filters: ProductFilters = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    setLoading(true);
    setError(null);

    ProductApi.getProducts(filters)
      .then((res) => {
        if (!mounted) return;

        setProducts(res.items);
        setPage(res.meta.page);
        setTotalPages(res.meta.totalPages);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err.message || "Failed to fetch products");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [JSON.stringify(filters)]);

  return {
    products,
    page,
    totalPages,
    loading,
    error,
  };
}
