"use client";

import { useEffect, useState } from "react";
import { ProductApi } from "@/lib/products/product";
import { Product } from "@/lib/products/types/types";

export function useProduct(productId: number) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) return;

    let mounted = true;

    ProductApi.getProductById(productId)
      .then((data) => {
        if (mounted) setProduct(data);
      })
      .catch((err) => {
        if (mounted) setError(err.message || "Failed to fetch product");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [productId]);

  return { product, loading, error };
}
