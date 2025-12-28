"use client";

import { useEffect, useState } from "react";
import { ProductApi } from "@/lib/products/product";
import {
  Product,
  ProductFilters,
  PaginatedProducts,
} from "@/lib/products/types/types";

export function useProducts(filters: ProductFilters = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [meta, setMeta] = useState<PaginatedProducts["meta"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    setLoading(true);
    setError(null);

    ProductApi.getProducts(filters)
      .then((res: PaginatedProducts) => {
        if (!mounted) return;
        setProducts(res.items);
        setMeta(res.meta);
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
    meta,
    loading,
    error,
  };
}
