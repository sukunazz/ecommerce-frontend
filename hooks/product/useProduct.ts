"use client";

import { useEffect, useState } from "react";
import { ProductApi, ProductFilters } from "@/lib/products/product";
import { Product } from "@/lib/products/types/types";

export function useProducts(filters?: ProductFilters) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    ProductApi.getProducts(filters)
      .then((data) => {
        if (mounted) setProducts(data);
      })
      .catch((err) => {
        if (mounted) setError(err.message || "Failed to fetch products");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [JSON.stringify(filters)]); // 👈 IMPORTANT

  return { products, loading, error };
}
