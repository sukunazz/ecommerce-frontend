// frontend/src/hooks/useReviews.ts
"use client";

import { useEffect, useState } from "react";
import { ReviewsApi, Review, CreateReviewDto } from "@/lib/reviews/reviews";

export function useReviews(productId: number) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchReviews() {
    try {
      setLoading(true);
      const data = await ReviewsApi.getByProduct(productId);
      setReviews(data);
    } catch (err: any) {
      setError(err.message || "Failed to load reviews");
    } finally {
      setLoading(false);
    }
  }

  async function addReview(data: CreateReviewDto) {
    try {
      await ReviewsApi.create(productId, data);
      await fetchReviews(); // refresh after submit
    } catch (err: any) {
      throw err;
    }
  }

  useEffect(() => {
    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  return {
    reviews,
    loading,
    error,
    addReview,
    refetch: fetchReviews,
  };
}
