"use client";

import { useEffect, useState } from "react";
import { ProductApi } from "@/lib/products/product";
import { Product } from "@/lib/products/types/types";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    ProductApi.getProducts()
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
  }, []);

  return {
    products,
    loading,
    error,
  };
}
